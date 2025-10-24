export default function LoadingSpinner() {
  return (
    <div className="text-center py-16">
      <div className="modern-card max-w-md mx-auto p-8">
        <div className="inline-flex flex-col items-center">
          <div className="loading-spinner mb-6"></div>
          <h3 className="text-xl font-bold text-text-primary mb-3">
            正在为您生成专属名字...
          </h3>
          <p className="text-text-secondary text-center leading-relaxed">
            请稍候，AI正在精心挑选最适合您的名字
          </p>
          <div className="flex items-center gap-1 mt-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}