function AppFooter() {
	return (
		<div className="px-2 sm:px-4">
			<div className="text-center mt-6 sm:mt-8 md:mt-12 text-cyan-400 font-mono text-xs sm:text-sm mb-4 sm:mb-6">
				<span className="hover:text-pink-400 duration-200">RETRO WEATHER NETWORK © 2000</span>
				<span className="hidden sm:inline"> • </span>
				<span className="block sm:inline hover:text-purple-500 hover:cursor-grab duration-200">ALWAYS ONLINE</span>
				<span className="hidden sm:inline"> • </span>
				<span className="block sm:inline hover:text-orange-600 hover:cursor-crosshair duration-200">
					ALWAYS WATCHING
				</span>
			</div>
		</div>
	)
}

export default AppFooter
