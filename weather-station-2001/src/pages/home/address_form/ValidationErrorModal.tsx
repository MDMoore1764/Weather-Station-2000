import ReactModal from "react-modal"

const validStates = [
	{
		icon: "🔍",
		title: "QUICK SEARCH MODE",
		description: "Enter any location information.",
		example: "San Francisco, CA  or  90210"
	},
	{
		icon: "🏠",
		title: "POSTAL ADDRESS MODE",
		description: "Street number, street name, and ZIP code.",
		example: "123 + Main Street + 12345"
	},
	{
		icon: "📍",
		title: "CITY ADDRESS MODE",
		description: "Street number, street name, city, and state.",
		example: "456 + Oak Ave + Portland + OR"
	}
]

type TProps = {
	onClose: () => void
	title?: string
	subtitle?: string
}

export const ValidationErrorModal = (props: TProps) => {
	return (
		<ReactModal
			isOpen={true}
			onRequestClose={props.onClose}
			closeTimeoutMS={1000}
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			className={"fixed inset-0 flex items-center justify-center p-4 z-50 outline-none bg-gray-900/90"}
		>
			<div className="mb-6 relative ">
				{/* Main Error Container */}
				<div className="bg-red-900 border-4 border-yellow-400 rounded-lg shadow-2xl shadow-red-500/50 overflow-hidden relative">
					{/* Animated Border Glow */}
					<div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-yellow-400 via-red-500 to-yellow-400 rounded-lg opacity-60 animate-pulse"></div>

					{/* Content */}
					<div className="relative bg-red-900 rounded-lg p-6">
						{/* Header */}
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center space-x-3">
								<div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
									<span className="text-red-900 text-lg font-bold">⚠</span>
								</div>
								<div>
									<h3 className="text-yellow-300 text-xl font-bold uppercase tracking-wider animate-pulse uppercase">
										{props.title ?? "VALIDATION ERROR"}
									</h3>
									<div className="text-red-300 text-sm font-mono uppercase">
										{" "}
										{props.subtitle ?? "SYSTEM MALFUNCTION"}
									</div>
								</div>
							</div>
						</div>

						{/* Separator */}
						<div className="border-t-2 border-yellow-400/50 my-4"></div>

						{/* Valid States Header */}
						<div className="text-center mb-4">
							<div className="text-cyan-300 text-lg font-bold uppercase tracking-wider animate-pulse">
								💾 VALID INPUT CONFIGURATIONS 💾
							</div>
							<div className="text-yellow-400 text-xs font-mono uppercase">Choose one of the following options:</div>
						</div>

						{/* Valid States Grid */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{validStates.map((state, index) => (
								<div
									key={index}
									className="bg-black border-2 border-cyan-400 rounded p-4 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30"
									style={{ animationDelay: `${index * 0.2}s` }}
								>
									{/* State Icon & Title */}
									<div className="text-center mb-2">
										<div className="text-2xl mb-1 animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
											{state.icon}
										</div>
										<div className="text-cyan-300 text-xs font-bold uppercase tracking-wider">{state.title}</div>
									</div>

									{/* Description */}
									<div className="text-green-300 text-xs text-center mb-2 font-mono leading-tight">
										{state.description}
									</div>

									{/* Example */}
									<div className="bg-gray-800 border border-green-400 rounded p-2">
										<div className="text-yellow-400 text-xs text-center font-mono">{state.example}</div>
									</div>
								</div>
							))}
						</div>

						{/* Footer */}
						<div className="mt-6 text-center">
							<div className="text-purple-400 text-xs font-mono uppercase tracking-widest animate-pulse">
								🎯 SELECT ANY ONE OPTION TO PROCEED 🎯
							</div>
						</div>

						{/* Floating Particles */}
						<div className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-40"></div>
						<div className="absolute top-4 right-2 w-1 h-1 bg-red-400 rounded-full animate-bounce opacity-60"></div>
						<div className="absolute bottom-2 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50"></div>
					</div>
				</div>

				{/* Glowing Base Effect */}
				<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gradient-to-r from-transparent via-red-500/30 to-transparent blur-xl"></div>
			</div>
		</ReactModal>
	)
}
