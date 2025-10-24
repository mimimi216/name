import { formatGender, formatStyle } from '../lib/utils'

interface InputSectionProps {
  description: string
  setDescription: (value: string) => void
  gender: string
  setGender: (value: string) => void
  style: string
  setStyle: (value: string) => void
  onGenerate: () => void
  loading: boolean
}

export default function InputSection({
  description,
  setDescription,
  gender,
  setGender,
  style,
  setStyle,
  onGenerate,
  loading
}: InputSectionProps) {
  return (
    <div className="modern-card rounded-2xl p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* 文本输入区域 */}
        <div>
          <label className="block text-xl font-bold text-text-primary mb-4 flex items-center">
            <span className="text-2xl mr-2">✨</span>
            描述您的期望
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="请描述您的性格、爱好或对名字的期望...

例如：
• 喜欢大海和自然，性格温柔
• 希望名字有力量感和创意
• 喜欢音乐和艺术，向往浪漫
• 性格开朗，希望名字阳光"
            className="modern-input w-full h-36 px-5 py-4 text-text-primary resize-none focus:ring-0 text-base leading-relaxed"
            maxLength={200}
          />
          <p className="text-sm text-text-secondary mt-2 text-right font-medium">
            {description.length}/200
          </p>
        </div>

        {/* 性别选择 */}
        <div>
          <label className="block text-xl font-bold text-text-primary mb-4 flex items-center">
            <span className="text-2xl mr-2">🎯</span>
            性别选择
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 'male', label: '男性', emoji: '👨' },
              { value: 'female', label: '女性', emoji: '👩' },
              { value: 'neutral', label: '中性', emoji: '⚧️' },
              { value: 'any', label: '不限', emoji: '🌟' }
            ].map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={gender === option.value}
                  onChange={(e) => setGender(e.target.value)}
                  className="sr-only"
                />
                <div className={`choice-button px-4 py-3 text-center transition-all font-medium ${
                  gender === option.value ? 'selected' : 'text-text-secondary'
                }`}>
                  <span className="text-2xl mr-2">{option.emoji}</span>
                  <span className="block text-sm">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 风格选择 */}
        <div>
          <label className="block text-xl font-bold text-text-primary mb-4 flex items-center">
            <span className="text-2xl mr-2">🎨</span>
            风格偏好
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 'traditional', label: '传统古典', emoji: '🏛️' },
              { value: 'modern', label: '现代时尚', emoji: '🔥' },
              { value: 'cute', label: '可爱清新', emoji: '🌸' },
              { value: 'cool', label: '帅气稳重', emoji: '❄️' }
            ].map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="style"
                  value={option.value}
                  checked={style === option.value}
                  onChange={(e) => setStyle(e.target.value)}
                  className="sr-only"
                />
                <div className={`choice-button px-4 py-3 text-center transition-all font-medium ${
                  style === option.value ? 'selected' : 'text-text-secondary'
                }`}>
                  <span className="text-2xl mr-2">{option.emoji}</span>
                  <span className="block text-sm">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 生成按钮 */}
        <div className="pt-4">
          <button
            onClick={onGenerate}
            disabled={!description.trim() || loading}
            className={`gradient-button w-full py-5 text-xl font-semibold text-white rounded-2xl transition-all relative overflow-hidden ${
              !description.trim() || loading
                ? 'opacity-60 cursor-not-allowed transform-none'
                : 'hover:transform hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                正在生成中...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <span className="text-2xl mr-3">✨</span>
                生成专属名字
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}