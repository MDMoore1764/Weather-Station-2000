type TProps = {
	text?: string
	percent: number
}

function LoadingBar(props: TProps) {
	return (
		<div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mb-4 sm:mb-6 px-2">
			<div className="bg-gray-800 rounded-full h-5 sm:h-6 border-2 sm:border-4 border-cyan-400 shadow-lg shadow-cyan-400/50 relative overflow-hidden">
				<div
					className="bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 h-full rounded-full animate-pulse relative"
					style={{ width: `${props.percent}%` }}
				>
					<div className="absolute top-0 right-0 w-2 sm:w-4 h-full bg-white opacity-100 animate-pulse"></div>
				</div>

				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-white text-xs sm:text-sm font-bold uppercase tracking-widest drop-shadow-lg px-2">
						{props.text}
					</span>
				</div>
			</div>
		</div>
	)
}

export default LoadingBar
