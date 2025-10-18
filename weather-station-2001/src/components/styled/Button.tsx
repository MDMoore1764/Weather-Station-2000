import { ButtonHTMLAttributes } from "react"
import { useTheme } from "../../themes/ThemeContext"

type ButtonVariant = "primary" | "secondary" | "danger"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
	const { theme } = useTheme()

	const variantClasses = {
		primary: `bg-gradient-to-r ${theme.colors.buttonPrimary}`,
		secondary: `bg-gradient-to-r ${theme.colors.buttonSecondary}`,
		danger: `bg-gradient-to-r ${theme.colors.buttonDanger}`
	}

	return (
		<button
			className={`${variantClasses[variant]} text-white font-bold py-2 px-4 uppercase tracking-wider border-2 border-white hover:scale-105 transition-all duration-300 shadow-lg shadow-${theme.colors.shadow} disabled:opacity-50 disabled:hover:scale-100 text-sm sm:text-base ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}
