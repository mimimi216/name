export default function Header() {
  return (
    <header className="relative z-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="text-5xl mr-4">🌸</div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              和风命名
            </h1>
            <div className="text-5xl ml-4">🗾</div>
          </div>
          <p className="text-xl text-text-secondary font-medium">
            智能日语名生成器 · 用AI创造最美的日语名字
          </p>
        </div>
      </div>
    </header>
  )
}