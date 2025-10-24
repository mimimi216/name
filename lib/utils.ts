import { JapaneseName, GenerateParams } from './types'
import { generateNamesWithAPI } from './api'

// 保留模拟数据作为备用
const mockNames = {
  male: {
    traditional: [
      {
        kanji: "松田 健太",
        hiragana: "まつだ けんた",
        romaji: "Matsuda Kenta",
        reason: "根据您对传统文化的喜爱，'松田'寓意如松树般坚毅，'健太'表示健康强壮，适合稳重传统的性格。",
        meaning: "松：坚毅不屈，田：踏实稳重，健：健康活力，太：大气包容"
      },
      {
        kanji: "佐藤 誠",
        hiragana: "さとう まこと",
        romaji: "Sato Makoto",
        reason: "根据您的描述，'佐藤'是经典姓氏，'誠'意为真诚，体现了您追求真实的品格。",
        meaning: "佐：辅助领导，藤：高贵坚韧，誠：真诚正直"
      },
      {
        kanji: "高橋 大輝",
        hiragana: "たかはし だいき",
        romaji: "Takahashi Daiki",
        reason: "根据您对明亮气质的偏好，'高橋'寓意高远，'大輝'意为伟大的光辉，象征前程似锦。",
        meaning: "高：高尚品格，橋：连接他人，大：胸怀宽广，輝：光辉灿烂"
      }
    ],
    modern: [
      {
        kanji: "結城 陸",
        hiragana: "ゆうき りく",
        romaji: "Yuki Riku",
        reason: "根据您对现代感的追求，'結城'寓意连接未来，'陸'象征脚踏实地又志向远大。",
        meaning: "結：缘分联结，城：坚固内心，陸：稳重踏实"
      },
      {
        kanji: "桐谷 和人",
        hiragana: "きりたに かずと",
        romaji: "Kiritani Kazuto",
        reason: "根据您对和谐的追求，'桐谷'寓意自然生长，'和人'表示与人为善的品格。",
        meaning: "桐：高洁品格，谷：包容宽广，和：和谐友善，人：人情温暖"
      },
      {
        kanji: "月城 凪",
        hiragana: "つきしろ なぎ",
        romaji: "Tsukishiro Nagi",
        reason: "根据您对宁静气质的喜爱，'月城'如月光般优雅，'凪'寓意内心平静。",
        meaning: "月：皎洁美好，城：守护他人，凪：宁静致远"
      }
    ]
  },
  female: {
    traditional: [
      {
        kanji: "佐々木 美咲",
        hiragana: "ささき みさき",
        romaji: "Sasaki Misaki",
        reason: "根据您对美好的追求，'佐々木'是经典姓氏，'美咲'意为美丽绽放的花朵。",
        meaning: "佐々：辅助成长，木：坚韧生命力，美：内外兼修，咲：绚烂绽放"
      },
      {
        kanji: "山口 詩織",
        hiragana: "やまぐち しおり",
        romaji: "Yamaguchi Shiori",
        reason: "根据您对文艺气息的喜爱，'山口'寓意自然之美，'詩織'表示诗意的生活。",
        meaning: "山：稳重可靠，口：善于表达，詩：浪漫情怀，織：创造美好"
      },
      {
        kanji: "小林 桃子",
        hiragana: "こばやし ももこ",
        romaji: "Kobayashi Momoko",
        reason: "根据您对可爱风格的偏好，'小林'寓意生机勃勃，'桃子'象征甜美可爱。",
        meaning: "小：精致细致，林：生机盎然，桃：甜美可爱，子：珍贵宝贝"
      }
    ],
    modern: [
      {
        kanji: "星野 凛",
        hiragana: "ほしの りん",
        romaji: "Hoshino Rin",
        reason: "根据您对现代感的追求，'星野'寓意如星光般闪耀，'凛'表示优雅坚强的气质。",
        meaning: "星：璀璨夺目，野：自由奔放，凛：优雅坚强"
      },
      {
        kanji: "朝陽 さくら",
        hiragana: "あさひ さくら",
        romaji: "Asahi Sakura",
        reason: "根据您对阳光性格的描述，'朝陽'寓意希望，'さくら'是樱花，象征美好。",
        meaning: "朝：充满希望，陽：温暖阳光，桜：美好绽放"
      },
      {
        kanji: "花澤 香菜",
        hiragana: "はなざわ かな",
        romaji: "Hanazawa Kana",
        reason: "根据您对自然美的喜爱，'花澤'寓意如花般美丽，'香菜'代表清新自然。",
        meaning: "花：美丽绽放，澤：滋润他人，香：芬芳怡人，菜：自然清新"
      }
    ]
  }
}

// 主要的生成函数，优先使用API，失败时回退到模拟数据
export async function generateNames(description: string, gender: string, style: string): Promise<JapaneseName[]> {
  try {
    // 尝试使用API生成
    const apiNames = await generateNamesWithAPI(description, gender, style)
    console.log('API生成成功，返回', apiNames.length, '个名字')
    return apiNames
  } catch (error) {
    console.error('API生成失败，使用备用数据:', error)

    // API失败时，返回模拟数据作为备用
    let names: JapaneseName[] = []

    // 根据性别和风格选择相应的名字
    if (gender === 'male' || gender === 'neutral' || gender === 'any') {
      const maleNames = mockNames.male[style as keyof typeof mockNames.male] || mockNames.male.modern
      names = names.concat(maleNames.slice(0, Math.ceil(3 / 2)))
    }

    if (gender === 'female' || gender === 'neutral' || gender === 'any') {
      const femaleNames = mockNames.female[style as keyof typeof mockNames.female] || mockNames.female.modern
      names = names.concat(femaleNames.slice(0, Math.floor(3 / 2)))
    }

    // 如果没有匹配的，默认返回现代风格的名字
    if (names.length === 0) {
      names = [...mockNames.female.modern.slice(0, 3)]
    }

    // 确保总是返回3个名字
    while (names.length < 3) {
      const allNames = [...mockNames.male.modern, ...mockNames.female.modern]
      const randomName = allNames[Math.floor(Math.random() * allNames.length)]
      if (!names.find(n => n.kanji === randomName.kanji)) {
        names.push(randomName)
      }
    }

    return names.slice(0, 3)
  }
}

export function formatGender(gender: string): string {
  const genderMap: { [key: string]: string } = {
    'male': '男性',
    'female': '女性',
    'neutral': '中性',
    'any': '不限'
  }
  return genderMap[gender] || '不限'
}

export function formatStyle(style: string): string {
  const styleMap: { [key: string]: string } = {
    'traditional': '传统古典',
    'modern': '现代时尚',
    'cute': '可爱清新',
    'cool': '帅气稳重'
  }
  return styleMap[style] || '现代时尚'
}