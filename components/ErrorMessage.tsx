import { useState } from 'react'

interface ErrorMessageProps {
  error: string
  onRetry?: () => void
  onDismiss?: () => void
}

export default function ErrorMessage({ error, onRetry, onDismiss }: ErrorMessageProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md slide-up">
      <div className="modern-card p-6 border-l-4 border-red-400 bg-red-50/90 backdrop-blur-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center">
              <span className="text-white text-sm">!</span>
            </div>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-red-800">
              生成失败
            </h3>
            <p className="mt-1 text-sm text-red-700">
              {error}
            </p>
            <div className="mt-3 flex space-x-2">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-md transition-colors"
                >
                  重试
                </button>
              )}
              <button
                onClick={handleDismiss}
                className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded-md transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}