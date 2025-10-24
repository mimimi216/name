import { JapaneseName, GenerateParams } from './types'

// 调用本地API路由生成日语名字
export async function generateNamesWithAPI(description: string, gender: string, style: string): Promise<JapaneseName[]> {
  try {
    console.log('发送API请求:', { description: description.substring(0, 50) + '...', gender, style })

    const response = await fetch('/api/generate-names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description,
        gender,
        style
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = errorData.error || `API请求失败: ${response.status}`
      console.error('API请求失败:', response.status, errorMessage)
      throw new Error(errorMessage)
    }

    const data = await response.json()
    console.log('API响应:', data)

    if (!data.names || !Array.isArray(data.names)) {
      throw new Error('API返回数据格式不正确')
    }

    const validNames = data.names.filter((name: any) =>
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
    return validNames

  } catch (error) {
    console.error('生成名字时出错:', error)
    throw error
  }
}