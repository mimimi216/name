import { useState } from 'react'
import { JapaneseName } from '../lib/types'

interface NameCardProps {
  name: JapaneseName
  isFavorite: boolean
  onToggleFavorite: () => void
}

export default function NameCard({ name, isFavorite, onToggleFavorite }: NameCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="modern-card rounded-2xl p-7 relative overflow-hidden group">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 -mr-16 -mt-16 group-hover:opacity-30 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full opacity-20 -ml-12 -mb-12 group-hover:opacity-30 transition-opacity"></div>

      {/* 收藏按钮 */}
      <button
        onClick={onToggleFavorite}
        className="absolute top-5 right-5 z-10 text-2xl hover:scale-110 transition-all duration-300 hover:rotate-12"
      >
        {isFavorite ? (
          <span className="drop-shadow-sm">❤️</span>
        ) : (
          <span className="opacity-70 hover:opacity-100">🤍</span>
        )}
      </button>

      {/* 名字主体 */}
      <div className="text-center mb-6 relative z-5">
        <h3 className="text-3xl font-bold text-text-primary mb-3 leading-tight">
          {name.kanji}
        </h3>
        <p className="text-lg text-text-secondary mb-2 font-medium">
          {name.hiragana}
        </p>
        <p className="text-base text-text-secondary italic opacity-80">
          {name.romaji}
        </p>
      </div>

      {/* 分割线 */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-5"></div>

      {/* 生成理由 */}
      <div className="mb-6">
        <h4 className="text-base font-bold text-text-primary mb-3 flex items-center">
          <span className="text-xl mr-2">💫</span>
          生成理由
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed">
          {name.reason}
        </p>
      </div>

      {/* 文化寓意 - 可展开/收起 */}
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-base font-bold text-text-primary mb-3 flex items-center w-full hover:text-primary transition-colors group"
        >
          <span className="text-xl mr-2 group-hover:scale-110 transition-transform">
            {isExpanded ? '📖' : '📚'}
          </span>
          文化寓意
          <span className="ml-auto text-sm font-normal text-text-secondary group-hover:text-primary transition-colors">
            {isExpanded ? '收起' : '查看详情'}
          </span>
        </button>

        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
            <p className="text-sm text-text-secondary leading-relaxed">
              {name.meaning}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}