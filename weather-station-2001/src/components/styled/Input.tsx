import { InputHTMLAttributes } from "react"
import { useTheme } from "../../themes/ThemeContext"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	labelColor?: string
}

export function Input({ label, labelColor, className = "", ...props }: InputProps) {
	const { theme } = useTheme()

	return (
		<div className="w-full">
			{label && (
				<div
					className={`block text-xs sm:text-sm font-bold mb-1 sm:mb-2 uppercase tracking-wider ${labelColor || `text-${theme.colors.text}`}`}
				>
					{label}
				</div>
			)}
			<input
				className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-black border-2 border-${theme.colors.inputBorder} text-${theme.colors.inputText} font-mono text-sm focus:outline-none focus:border-${theme.colors.primary} focus:shadow-lg focus:shadow-${theme.colors.shadow} ${className}`}
				{...props}
			/>
		</div>
	)
}
