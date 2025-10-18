import type { TForecast } from "../../../apis/weather_client/WeatherClient.types"
import { Cloud, CloudDrizzle, CloudRain, Droplets, Moon, Snowflake, Sun, TriangleAlert, Wind, Zap } from "lucide-react"
import { useHomePageContext } from "../state/StateContext"
import WeatherAlertsBanner from "./weather_banners/WeatherAlertsBanner"
import { DateTime } from "luxon"
import WeatherAllGoodBanner from "./weather_banners/WeatherAllGoodBanner"
import { useTheme } from "../../../themes/ThemeContext"
import { Button } from "../../../components/styled/Button"

type TProps = {
	forecast: TForecast | null
}

// Main Weather Display Component
const WeatherDisplay = (props: TProps) => {
	const homePageContext = useHomePageContext()
	const { theme } = useTheme()

	if (!props.forecast || !props.forecast.forecasts || props.forecast.forecasts.length === 0) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center px-4">
				<div className={`text-${theme.colors.primary} text-lg sm:text-xl md:text-2xl font-mono animate-pulse text-center`}>
					NO WEATHER DATA AVAILABLE
				</div>
			</div>
		)
	}

	const currentForecast = props.forecast.forecasts[0]
	const upcomingForecasts = props.forecast.forecasts.filter((u) => u.isDaytime).slice(1, 7)
	const currentDateTime = formatDateTime(currentForecast.startTime)
	const activeAlerts = props.forecast.alerts.filter((a) => DateTime.fromISO(a.expires) > DateTime.now())
	const inactiveAlerts = props.forecast.alerts.filter((a) => DateTime.fromISO(a.expires) <= DateTime.now())

	return (
		<div>
			{/* Weather Alerts Banner */}
			{/* <WeatherAlertsBanner alerts={props.forecast.alerts} /> */}
			<style jsx>{`
				.neon {
					animation: flicker 3s infinite alternate;
				}

				.gentle-neon {
					animation: gentle-flicker 3s infinite alternate;
				}

				@keyframes flicker {
					0%,
					18%,
					22%,
					25%,
					53%,
					57%,
					100% {
						opacity: 1;
					}

					20%,
					24%,
					55% {
						opacity: 0.6;
					}
				}

				@keyframes gentle-flicker {
					0%,
					18%,
					22%,
					25%,
					53%,
					57%,
					100% {
						opacity: 1;
					}

					20%,
					24%,
					55% {
						opacity: 0.9;
					}
				}
			`}</style>
			<div className="absolute top-0 left-0 right-0">
				<WeatherAlertsBanner activeAlerts={activeAlerts} />
				<WeatherAllGoodBanner activeAlerts={activeAlerts} />
			</div>
			<Button
				variant="danger"
				className="fixed bottom-2 left-2 text-xs sm:text-sm z-50"
				onClick={() => {
					homePageContext.dispatch({
						action: "setSubmissionState",
						payload: null
					})

					homePageContext.dispatch({
						action: "setAppState",
						payload: "address_input"
					})
				}}
			>
				NEW SCAN
			</Button>

			<div
				className={`container mx-auto px-2 sm:px-4 py-0 ${activeAlerts.length > 0 ? "mt-24 sm:mt-28 md:mt-35" : "mt-12 sm:mt-14 md:mt-16"} relative z-10`}
			>
				{/* Current Weather - Hero Section */}
				<div className="max-w-6xl mx-auto mb-4 sm:mb-6 md:mb-8">
					<div
						className={`bg-${theme.colors.background} border-2 sm:border-4 border-${theme.colors.cardBorder} rounded-lg p-3 sm:p-4 md:p-5 shadow-2xl shadow-${theme.colors.shadow} relative`}
					>
						<div
							className={`absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r ${theme.colors.headerGradient} rounded-lg -z-10 animate-pulse`}
						/>

						{/* Current Conditions Header */}
						<div className="text-center mb-3 sm:mb-4 md:mb-6">
							<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300 uppercase tracking-wider mb-0">
								Current Conditions
							</h2>
							<div className="text-cyan-300 text-xs sm:text-sm font-mono">
								{currentDateTime.date} • {currentDateTime.time}
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
							{/* Daytime Temperature & Icon */}
							<div className="text-center">
								<div className="flex justify-center mb-1 animate-pulse">
									{getWeatherIcon(currentForecast.shortForecast, currentForecast.isDaytime, "large")}
								</div>
								<div className="text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-2">
									{currentForecast.temperature}°
								</div>
								<div className="text-base sm:text-lg md:text-xl text-cyan-300 uppercase tracking-wider mb-2">
									{currentForecast.shortForecast}
								</div>
								<div className="text-green-300 text-xs sm:text-sm font-mono px-2 sm:px-4">
									{currentForecast.detailedForecast}
								</div>
							</div>

							{/* <div className="text-center">
								<div className="flex justify-center mb-1">
									{getWeatherIcon(currentForecast.shortForecast, currentForecast.isDaytime, "large")}
								</div>
								<div className="text-8xl  md:text-8xl font-bold text-white mb-2">{currentForecast.temperature}°</div>
								<div className="text-xl text-cyan-300 uppercase tracking-wider mb-2">
									{currentForecast.shortForecast}
								</div>
								<div className="text-green-300 text-sm font-mono px-4">{currentForecast.detailedForecast}</div>
							</div> */}

							{/* Weather Details */}
							<div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
								<div className="bg-black border-2 border-blue-400 p-2 sm:p-3 md:p-4 rounded hover:border-blue-600">
									<Wind className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-400 mx-auto mb-1 sm:mb-2" />
									<div className="text-blue-300 text-xs uppercase text-center hover:text-blue-500">Wind</div>
									<div className="text-white text-base sm:text-lg md:text-xl font-bold text-center">
										{currentForecast.windSpeed}
									</div>
									<div className="text-blue-300 text-xs sm:text-sm text-center">{currentForecast.windDirection}</div>
								</div>

								<div className="bg-black border-2 border-cyan-400 p-2 sm:p-3 md:p-4 rounded hover:border-cyan-600">
									<Droplets className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-cyan-400 mx-auto mb-1 sm:mb-2" />
									<div className="text-cyan-300 text-xs uppercase text-center hover:text-cyan-500">Precipitation</div>
									<div className="text-white text-base sm:text-lg md:text-xl font-bold text-center">
										{currentForecast.probabilityOfPrecipitation.replace("wmoUnit:percent", "%")}
									</div>
								</div>

								<div className="bg-black border-2 border-purple-400 p-2 sm:p-3 md:p-4 rounded col-span-2 hover:border-purple-600 gentle-neon">
									<div className="text-purple-300 text-xs uppercase text-center mb-1 sm:mb-2 hover:text-purple-500">
										Temperature Trend
									</div>
									<div className="text-white text-base sm:text-lg font-bold text-center">
										{currentForecast.temperatureTrend || "Steady"}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Forecast Grid */}
				<div className="max-w-6xl mx-auto">
					<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300 mb-3 sm:mb-4 uppercase tracking-wider text-center">
						📡 Extended Forecast 📡
					</h3>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
						{upcomingForecasts.map((forecast, index) => {
							return (
								<div
									key={index}
									className="bg-gray-900 border-2 border-cyan-400 rounded-lg p-2 sm:p-3 md:p-4 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30"
								>
									{/* Icon */}
									<div className="flex justify-center mb-1 sm:mb-2">
										{getWeatherIcon(forecast.shortForecast, forecast.isDaytime, "small")}
									</div>

									{/* Temperature */}
									<div className="text-center mb-1 sm:mb-2">
										<div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{forecast.temperature}°</div>
									</div>

									{/* Condition */}
									<div className="text-yellow-300 text-xs text-center uppercase mb-1 sm:mb-2 leading-tight">
										{forecast.shortForecast}
									</div>

									{/* Additional Info */}
									<div className="border-t border-cyan-400/30 pt-1 sm:pt-2 space-y-0.5 sm:space-y-1">
										<div className="flex items-center justify-between text-xs">
											<span className="text-blue-300">💧</span>
											<span className="text-white font-mono text-xs">
												{forecast.probabilityOfPrecipitation.replace("wmoUnit:percent", "%")}
											</span>
										</div>
										<div className="flex items-center justify-between text-xs">
											<span className="text-green-300">💨</span>
											<span className="text-white font-mono text-xs">
												{forecast.windSpeed.split(" ")[0]} {forecast.windDirection}
											</span>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>

				{/* Active Alerts Section */}
				{inactiveAlerts && inactiveAlerts.length > 0 && (
					<div className="max-w-6xl mx-auto mt-4 sm:mt-6 md:mt-8">
						<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400 mb-3 sm:mb-4 uppercase tracking-wider text-center animate-pulse">
							⚠️ Recent Weather Alerts (Expired) ⚠️
						</h3>

						<div className="space-y-3 sm:space-y-4">
							{inactiveAlerts.map((alert, index) => (
								<div
									key={index}
									className="bg-red-900 border-2 sm:border-4 border-yellow-400 rounded-lg p-3 sm:p-4 md:p-6 shadow-2xl shadow-red-500/50"
								>
									<div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
										<div className="flex-shrink-0">
											<div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
												<TriangleAlert className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-900" />
											</div>
										</div>

										<div className="flex-1 min-w-0">
											<h4 className="text-yellow-300 text-sm sm:text-base md:text-xl font-bold uppercase mb-1 sm:mb-2">
												{alert.event}
											</h4>

											<p className="text-red-200 font-mono text-xs sm:text-sm mb-2 sm:mb-3">{alert.headline}</p>

											{alert.description && (
												<p className="text-red-300 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
													{alert.description}
												</p>
											)}

											<div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 text-xs font-mono">
												<div className="bg-black border border-yellow-400 px-2 py-1 rounded">
													<span className="text-yellow-400">SEVERITY:</span>{" "}
													<span className="text-white">{alert.severity}</span>
												</div>
												<div className="bg-black border border-yellow-400 px-2 py-1 rounded">
													<span className="text-yellow-400">URGENCY:</span> <span className="text-white">{alert.urgency}</span>
												</div>
												<div className="bg-black border border-yellow-400 px-2 py-1 rounded">
													<span className="text-yellow-400">EXPIRES:</span>{" "}
													<span className="text-white">{formatDateTime(alert.expires).date}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default WeatherDisplay

const formatDateTime = (isoString: string) => {
	const date = new Date(isoString)

	return {
		time: date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true
		}),
		date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
	}
}

const getWeatherIcon = (shortForecast: string, isDaytime: boolean, size: "small" | "large") => {
	const forecast = shortForecast.toLowerCase()
	const iconClass = size === "small" ? "w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" : "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"

	if (forecast.includes("thunder")) {
		return <Zap className={`${iconClass} text-yellow-400 animate-pulse`} />
	} else if (forecast.includes("snow")) {
		return <Snowflake className={`${iconClass} text-cyan-300`} />
	} else if (forecast.includes("rain") || forecast.includes("shower")) {
		return <CloudRain className={`${iconClass} text-blue-400`} />
	} else if (forecast.includes("drizzle")) {
		return <CloudDrizzle className={`${iconClass} text-blue-300`} />
	} else if (forecast.includes("cloud")) {
		return <Cloud className={`${iconClass} text-gray-400`} />
	} else if (forecast.includes("clear") || forecast.includes("sunny")) {
		return isDaytime ? (
			<Sun className={`${iconClass} text-yellow-400 animate-pulse`} />
		) : (
			<Moon className={`${iconClass} text-purple-300`} />
		)
	} else {
		return <Sun className={`${iconClass} text-yellow-400`} />
	}
}
