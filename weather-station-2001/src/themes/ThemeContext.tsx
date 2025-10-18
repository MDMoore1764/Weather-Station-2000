import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import type { Theme } from "./themes"
import { themes, defaultTheme } from "./themes"

type ThemeContextType = {
	theme: Theme
	setTheme: (themeName: string) => void
	availableThemes: Record<string, Theme>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(() => {
		// Try to load theme from localStorage
		const savedTheme = localStorage.getItem("weather-station-theme")
		return savedTheme && themes[savedTheme] ? themes[savedTheme] : defaultTheme
	})

	const setTheme = (themeName: string) => {
		if (themes[themeName]) {
			setThemeState(themes[themeName])
			localStorage.setItem("weather-station-theme", themeName)
		}
	}

	useEffect(() => {
		// Apply theme to document root for global styles if needed
		document.documentElement.setAttribute("data-theme", theme.name)
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, setTheme, availableThemes: themes }}>{children}</ThemeContext.Provider>
	)
}

export function useTheme() {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}
	return context
}
