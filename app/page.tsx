import GradientBlinds from "@/components/GradientBlinds"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 w-full h-full flex items-center justify-center">
        <GradientBlinds
          gradientColors={["#1a0b2e", "#2d1b69", "#6b21a8", "#9333ea"]}
          angle={15}
          noise={0.25}
          blindCount={13}
          blindMinWidth={50}
          spotlightRadius={0.38}
          spotlightSoftness={1.6}
          spotlightOpacity={0.42}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="overlay"
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center justify-center min-h-screen w-full px-5 sm:px-20">
            <div className="relative z-10 flex max-w-4xl flex-col items-center gap-8 text-center">
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl text-balance drop-shadow-2xl">
                The Future of Crypto
                <br />
                Trading Starts Here
              </h1>
              <p className="text-xl text-white/90 max-w-3xl text-pretty drop-shadow-lg">
                Access hundreds of digital assets with real-time charts, deep liquidity, and lightning-fast execution.
              </p>

              {/* Email Input and Signup Button */}
              <div className="flex flex-col gap-4 mt-4 w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 text-lg rounded-full bg-white/10 border-2 border-white/30 text-white placeholder-white/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white focus:border-white/50 transition-all"
                />
                <button className="w-full inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent shadow-2xl">
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
