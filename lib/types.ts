export interface JapaneseName {
  kanji: string
  hiragana: string
  romaji: string
  reason: string
  meaning: string
}

export interface GenerateParams {
  description: string
  gender: string
  style: string
}