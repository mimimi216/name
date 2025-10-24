import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import InputSection from '../components/InputSection'
import NameCard from '../components/NameCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { generateNames } from '../lib/utils'
import { JapaneseName } from '../lib/types'

export default function Home() {
  const [description, setDescription] = useState('')
  const [gender, setGender] = useState('any')
  const [style, setStyle] = useState('modern')
  const [names, setNames] = useState<JapaneseName[]>([])
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!description.trim()) return

    setLoading(true)
    setError(null)
    try {
      const generatedNames = await generateNames(description, gender, style)
      setNames(generatedNames)
      setError(null)
    } catch (error) {
      console.error('生成失败:', error)
      const errorMessage = error instanceof Error ? error.message : '生成名字时发生未知错误'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleErrorRetry = () => {
    setError(null)
    handleGenerate()
  }

  const toggleFavorite = (index: number) => {
    setFavorites(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <>
      <Head>
        <title>和风命名 - 智能日语名生成器</title>
        <meta name="description" content="基于AI的智能日语名字生成工具" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen relative overflow-hidden">
        {/* 装饰性背景元素 */}
        <div className="bg-decoration bg-decoration-1"></div>
        <div className="bg-decoration bg-decoration-2"></div>

        {/* 错误消息 */}
        {error && (
          <ErrorMessage
            error={error}
            onRetry={handleErrorRetry}
            onDismiss={() => setError(null)}
          />
        )}

        <Header />

        <main className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
          {/* 输入区域 */}
          <div className="fade-in">
            <InputSection
              description={description}
              setDescription={setDescription}
              gender={gender}
              setGender={setGender}
              style={style}
              setStyle={setStyle}
              onGenerate={handleGenerate}
              loading={loading}
            />
          </div>

          {/* 加载状态 */}
          {loading && (
            <div className="mt-16 slide-up">
              <LoadingSpinner />
            </div>
          )}

          {/* 结果展示区域 */}
          {names.length > 0 && !loading && (
            <div className="mt-20 slide-up">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  您的专属日语名字
                </h2>
                <p className="text-text-secondary text-lg">
                  基于您的描述，AI为您精心挑选了以下名字
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {names.map((name, index) => (
                  <div key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <NameCard
                      name={name}
                      isFavorite={favorites.includes(index)}
                      onToggleFavorite={() => toggleFavorite(index)}
                    />
                  </div>
                ))}
              </div>

              {/* 重新生成按钮 */}
              <div className="text-center">
                <button
                  onClick={handleGenerate}
                  className="gradient-button px-12 py-4 text-white text-lg font-semibold"
                >
                  重新生成
                </button>
              </div>
            </div>
          )}

          {/* 如果还没有生成结果，显示引导信息 */}
          {names.length === 0 && !loading && (
            <div className="mt-16 text-center fade-in">
              <div className="modern-card max-w-2xl mx-auto p-12">
                <div className="text-6xl mb-6">🌸</div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  开始您的日语命名之旅
                </h3>
                <p className="text-text-secondary text-lg leading-relaxed">
                  告诉我们您的期望、性格或喜好，<br />
                  AI 将为您创造独一无二的日语名字
                </p>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-32 pb-12 relative z-10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-text-secondary">
              © 2024 和风命名 · 用AI创造最美的日语名字
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}