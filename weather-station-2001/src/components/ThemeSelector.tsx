import { Palette } from "lucide-react"
import { useState } from "react"
import { useTheme } from "../themes/ThemeContext"

export function ThemeSelector() {
	const { theme, setTheme, availableThemes } = useTheme()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="fixed top-4 right-4 z-50">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`bg-black bg-opacity-50 border-2 border-${theme.colors.primary} text-${theme.colors.text} p-2 sm:p-3 rounded-full shadow-md hover:shadow-${theme.colors.shadow} hover:bg-${theme.colors.background} transition-all duration-200`}
				aria-label="Change theme"
			>
				<Palette className="w-5 h-5 sm:w-6 sm:h-6" />
			</button>

			{isOpen && (
				<div className="absolute top-full right-0 mt-2 bg-gray-900 border-2 border-cyan-400 rounded-lg shadow-xl p-3 sm:p-4 w-48 sm:w-56">
					<div className="text-cyan-300 text-xs sm:text-sm font-bold uppercase mb-2 sm:mb-3 tracking-wider">
						Select Theme
					</div>
					<div className="space-y-1 sm:space-y-2">
						{Object.values(availableThemes).map((t) => (
							<button
								key={t.name}
								onClick={() => {
									setTheme(t.name)
									setIsOpen(false)
								}}
								className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-mono transition-all duration-200 ${
									theme.name === t.name
										? `bg-${t.colors.primary} text-black font-bold`
										: `text-${t.colors.text} hover:bg-gray-800`
								}`}
							>
								{t.displayName}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
