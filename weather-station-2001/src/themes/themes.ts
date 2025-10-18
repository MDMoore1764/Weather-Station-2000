// Theme definitions for the Weather Station 2000 app
export interface Theme {
	name: string
	displayName: string
	colors: {
		primary: string
		secondary: string
		accent: string
		background: string
		text: string
		border: string
		buttonPrimary: string
		buttonSecondary: string
		buttonDanger: string
		inputBorder: string
		inputText: string
		headerGradient: string
		cardBorder: string
		shadow: string
	}
}

export const themes: Record<string, Theme> = {
	"neon-blue": {
		name: "neon-blue",
		displayName: "Neon Blue",
		colors: {
			primary: "cyan-400",
			secondary: "blue-500",
			accent: "purple-400",
			background: "gray-900",
			text: "cyan-300",
			border: "cyan-400",
			buttonPrimary: "from-cyan-600 to-blue-600",
			buttonSecondary: "from-purple-600 to-pink-600",
			buttonDanger: "from-red-600 to-orange-600",
			inputBorder: "cyan-400",
			inputText: "cyan-300",
			headerGradient: "from-cyan-500 via-blue-500 to-purple-500",
			cardBorder: "cyan-400",
			shadow: "cyan-400/50"
		}
	},
	"neon-pink": {
		name: "neon-pink",
		displayName: "Neon Pink",
		colors: {
			primary: "pink-400",
			secondary: "purple-500",
			accent: "cyan-400",
			background: "gray-900",
			text: "pink-300",
			border: "pink-400",
			buttonPrimary: "from-pink-600 to-purple-600",
			buttonSecondary: "from-purple-600 to-cyan-600",
			buttonDanger: "from-red-600 to-orange-600",
			inputBorder: "pink-400",
			inputText: "pink-300",
			headerGradient: "from-pink-500 via-purple-500 to-cyan-500",
			cardBorder: "pink-400",
			shadow: "pink-400/50"
		}
	},
	"neon-green": {
		name: "neon-green",
		displayName: "Neon Green",
		colors: {
			primary: "green-400",
			secondary: "lime-500",
			accent: "yellow-400",
			background: "gray-900",
			text: "green-300",
			border: "green-400",
			buttonPrimary: "from-green-600 to-lime-600",
			buttonSecondary: "from-lime-600 to-yellow-600",
			buttonDanger: "from-red-600 to-orange-600",
			inputBorder: "green-400",
			inputText: "green-300",
			headerGradient: "from-green-500 via-lime-500 to-yellow-500",
			cardBorder: "green-400",
			shadow: "green-400/50"
		}
	},
	"christmas": {
		name: "christmas",
		displayName: "Christmas",
		colors: {
			primary: "red-500",
			secondary: "green-500",
			accent: "yellow-400",
			background: "gray-900",
			text: "red-300",
			border: "red-500",
			buttonPrimary: "from-red-600 to-green-600",
			buttonSecondary: "from-green-600 to-red-600",
			buttonDanger: "from-red-700 to-red-900",
			inputBorder: "red-500",
			inputText: "red-300",
			headerGradient: "from-red-500 via-green-500 to-red-500",
			cardBorder: "red-500",
			shadow: "red-500/50"
		}
	},
	"retro-amber": {
		name: "retro-amber",
		displayName: "Retro Amber",
		colors: {
			primary: "amber-500",
			secondary: "orange-500",
			accent: "yellow-400",
			background: "gray-900",
			text: "amber-300",
			border: "amber-500",
			buttonPrimary: "from-amber-600 to-orange-600",
			buttonSecondary: "from-orange-600 to-yellow-600",
			buttonDanger: "from-red-600 to-orange-600",
			inputBorder: "amber-500",
			inputText: "amber-300",
			headerGradient: "from-amber-500 via-orange-500 to-yellow-500",
			cardBorder: "amber-500",
			shadow: "amber-500/50"
		}
	}
}

export const defaultTheme = themes["neon-pink"]
