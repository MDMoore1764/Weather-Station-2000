import { DateTime } from "luxon"
import { useTheme } from "../../../themes/ThemeContext"

type TProps = {
	currentTime: DateTime
}

function AppTitle(props: TProps) {
	const { theme } = useTheme()

	return (
		<div className="text-center mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4">
			<h1
				className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r ${theme.colors.headerGradient} animate-pulse font-mono leading-tight`}
			>
				WEATHER STATION 2000
			</h1>
			<div className="text-sm sm:text-lg md:text-xl lg:text-2xl text-green-400 font-mono">
				{props.currentTime.toLocaleString({
					month: "2-digit",
					day: "2-digit",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					hour12: true,
					localeMatcher: "best fit"
				})}
			</div>
		</div>
	)
}

export default AppTitle
