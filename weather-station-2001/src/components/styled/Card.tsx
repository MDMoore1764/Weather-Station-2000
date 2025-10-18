import { ReactNode } from "react"
import { useTheme } from "../../themes/ThemeContext"

interface CardProps {
	children: ReactNode
	className?: string
	withGlow?: boolean
}

export function Card({ children, className = "", withGlow = false }: CardProps) {
	const { theme } = useTheme()

	return (
		<div className={`bg-${theme.colors.background} rounded-lg p-4 sm:p-5 md:p-6 ${className}`}>
			{withGlow && (
				<div
					className={`absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r ${theme.colors.headerGradient} rounded-lg -z-10 animate-pulse`}
				/>
			)}
			{children}
		</div>
	)
}
