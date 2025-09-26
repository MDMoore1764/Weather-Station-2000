import { DateTime } from "luxon"

type TProps = {
	currentTime: DateTime
}

function AppTitle(props: TProps) {
	return (
		<div className="text-center mb-8">
			<h1 className="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse font-mono">
				WEATHER STATION 2000
			</h1>
			<div className="text-2xl text-green-400 font-mono">
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
