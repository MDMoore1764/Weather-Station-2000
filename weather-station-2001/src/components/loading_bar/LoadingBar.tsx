import React from "react"

type TProps = {
	text?: string
	percent: number
}

function LoadingBar(props: TProps) {
	return (
		<div className="w-80 mx-auto mb-6">
			<div className="bg-gray-800 rounded-full h-6 border-4 border-cyan-400 shadow-lg shadow-cyan-400/50 relative overflow-hidden">
				<div
					className="bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 h-full rounded-full animate-pulse relative"
					style={{ width: `${props.percent}%` }}
				>
					<div className="absolute top-0 right-0 w-4 h-full bg-white opacity-80 animate-pulse"></div>
				</div>

				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-white text-xs font-bold uppercase tracking-widest drop-shadow-lg">{props.text}</span>
				</div>
			</div>
		</div>
	)
}

export default LoadingBar
