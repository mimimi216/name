import { NextApiRequest, NextApiResponse } from 'next'

interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface DeepSeekResponse {
  id: string
  choices: Array<{
    message: {
      role: string
      content: string
      reasoning_content?: string
      tool_calls?: Array<{
        id: string
        type: string
        function: {
          name: string
          arguments: string
        }
      }>
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  created: number
  model: string
  object: string
}

interface DeepSeekRequest {
  model: string
  messages: DeepSeekMessage[]
  stream: boolean
  max_tokens: number
  enable_thinking: boolean
  thinking_budget: number
  min_p: number
  stop: string[] | null
  temperature: number
  top_p: number
  top_k: number
  frequency_penalty: number
  n: number
  response_format: { type: string }
  tools?: Array<{
    type: string
    function: {
      description: string
      name: string
      parameters: Record<string, any>
      strict: boolean
    }
  }>
}

// 构建日语名字生成的prompt
function buildGeneratePrompt(description: string, gender: string, style: string): string {
  const genderMap: { [key: string]: string } = {
    'male': '男性',
    'female': '女性',
    'neutral': '中性',
    'any': '不限性别'
  }

  const styleMap: { [key: string]: string } = {
    'traditional': '传统古典',
    'modern': '现代时尚',
    'cute': '可爱清新',
    'cool': '帅气稳重'
  }

  return `你是一个专业的日语名字生成专家。请根据用户的需求生成3个优美的日语名字。

用户描述：${description}
性别偏好：${genderMap[gender] || '不限'}
风格偏好：${styleMap[style] || '现代时尚'}

请严格按照以下JSON格式返回，不要添加任何其他文字：
[
  {
    "kanji": "日语汉字名字",
    "hiragana": "平假名读音",
    "romaji": "罗马字读音",
    "reason": "根据用户需求选择此名字的理由说明",
    "meaning": "每个汉字的详细寓意解释"
  },
  {
    "kanji": "第二个日语汉字名字",
    "hiragana": "第二个平假名读音",
    "romaji": "第二个罗马字读音",
    "reason": "根据用户需求选择此名字的理由说明",
    "meaning": "第二个每个汉字的详细寓意解释"
  },
  {
    "kanji": "第三个日语汉字名字",
    "hiragana": "第三个平假名读音",
    "romaji": "第三个罗马字读音",
    "reason": "根据用户需求选择此名字的理由说明",
    "meaning": "第三个每个汉字的详细寓意解释"
  }
]

要求：
1. 使用真实、常见的日本姓氏和名字组合
2. 名字要符合用户的性别和风格偏好
3. 寓意要美好、积极向上
4. 读音要自然流畅
5. 生成理由要与用户描述相匹配
6. 严格按照JSON格式返回，确保JSON语法正确

示例：
如果用户想要"温柔善良的女性名字，传统风格"，可以生成：
[
  {
    "kanji": "佐々木 優奈",
    "hiragana": "ささき ゆうな",
    "romaji": "Sasaki Yuna",
    "reason": "根据您对温柔善良性格的追求，'優奈'寓意优雅温柔，'佐々木'是经典姓氏，体现了传统日式美学。",
    "meaning": "佐々：辅助成长，木：坚韧生命力，優：优雅温柔，奈：美好可爱"
  }
]`
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { description, gender, style } = req.body

    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'Description is required' })
    }

    const apiKey = process.env.DEEPSEEK_API_KEY
    const apiUrl = process.env.DEEPSEEK_API_URL || 'https://api.siliconflow.cn/v1/chat/completions'
    const model = process.env.DEEPSEEK_MODEL || 'deepseek-ai/DeepSeek-V3'

    if (!apiKey) {
      throw new Error('API密钥未配置')
    }

    console.log('发送API请求:', {
      apiUrl,
      model,
      description: description.substring(0, 50) + '...',
      gender,
      style
    })

    const requestData: DeepSeekRequest = {
      model: model,
      messages: [
        {
          role: 'user',
          content: buildGeneratePrompt(description, gender, style)
        }
      ],
      stream: false,
      max_tokens: 4096,
      enable_thinking: false,
      thinking_budget: 4096,
      min_p: 0.05,
      stop: null,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      frequency_penalty: 0.5,
      n: 1,
      response_format: { type: 'text' }
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API请求失败:', response.status, errorText)
      throw new Error(`API请求失败: ${response.status} - ${errorText}`)
    }

    const data: DeepSeekResponse = await response.json()
    console.log('API响应:', data)

    const content = data.choices[0]?.message?.content
    if (!content) {
      throw new Error('API返回内容为空')
    }

    // 尝试解析JSON内容
    let namesData: any[]
    try {
      // 提取JSON部分（如果有其他文字包装）
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        namesData = JSON.parse(jsonMatch[0])
      } else {
        namesData = JSON.parse(content)
      }
    } catch (parseError) {
      console.error('JSON解析失败:', parseError)
      console.error('原始内容:', content)
      throw new Error('API返回格式解析失败')
    }

    // 验证返回的数据格式
    if (!Array.isArray(namesData) || namesData.length === 0) {
      throw new Error('API返回数据格式不正确')
    }

    // 确保每个名字都有必需的字段
    const validNames = namesData.filter(name =>
      name.kanji &&
      name.hiragana &&
      name.romaji &&
      name.reason &&
      name.meaning
    )

    if (validNames.length === 0) {
      throw new Error('API返回的数据格式不完整')
    }

    console.log('成功生成', validNames.length, '个名字')
    return res.status(200).json({ names: validNames })

  } catch (error) {
    console.error('生成名字时出错:', error)
    const errorMessage = error instanceof Error ? error.message : '生成名字时发生未知错误'
    return res.status(500).json({ error: errorMessage })
  }
}