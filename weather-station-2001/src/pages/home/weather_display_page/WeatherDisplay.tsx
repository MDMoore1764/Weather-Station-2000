import type { TForecast } from "../../../apis/weather_client/WeatherClient.types"
import { Cloud, CloudDrizzle, CloudRain, Droplets, Moon, Snowflake, Sun, TriangleAlert, Wind, Zap } from "lucide-react"
import { useHomePageContext } from "../state/StateContext"
import WeatherAlertsBanner from "./weather_banners/WeatherAlertsBanner"
import { DateTime } from "luxon"
import WeatherAllGoodBanner from "./weather_banners/WeatherAllGoodBanner"

type TProps = {
	forecast: TForecast | null
}

// Main Weather Display Component
const WeatherDisplay = (props: TProps) => {
	const homePageContext = useHomePageContext()

	if (!props.forecast || !props.forecast.forecasts || props.forecast.forecasts.length === 0) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center">
				<div className="text-cyan-400 text-2xl font-mono animate-pulse">NO WEATHER DATA AVAILABLE</div>
			</div>
		)
	}

	const currentForecast = props.forecast.forecasts[0]
	const upcomingForecasts = props.forecast.forecasts.filter((u) => u.isDaytime).slice(1, 7)
	const currentDateTime = formatDateTime(currentForecast.startTime)
	const activeAlerts = props.forecast.alerts.filter((a) => DateTime.fromISO(a.expires) > DateTime.now())

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
			<div className="absolute top-0 left-0 right-0 ">
				<WeatherAlertsBanner activeAlerts={activeAlerts} />
				<WeatherAllGoodBanner activeAlerts={activeAlerts} />
			</div>
			<button
				className="fixed bottom-2 left-2 text-red-600 border-4 rounded-full border-red-500 hover:shadow-lg hover:shadow-red-500 
             focus:outline-none focus:ring-0"
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
			</button>

			<div className={`container mx-auto px-4 py-0 ${"mt-35"} relative z-10`}>
				{/* Current Weather - Hero Section */}
				<div className="max-w-6xl mx-auto mb-8">
					<div className="bg-gray-900 border-4 border-pink-500 rounded-lg p-5 shadow-2xl shadow-pink-500/50 relative">
						<div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-lg -z-10 animate-pulse" />

						{/* Current Conditions Header */}
						<div className="text-center mb-6">
							<h2 className="text-3xl font-bold text-yellow-300 uppercase tracking-wider mb-0">Current Conditions</h2>
							<div className="text-cyan-300 text-sm font-mono">
								{currentDateTime.date} • {currentDateTime.time}
							</div>
						</div>

						<div className="grid md:grid-cols-2 gap-8 items-center">
							{/* Daytime Temperature & Icon */}
							<div className="text-center">
								<div className="flex justify-center mb-1 animate-pulse">
									{getWeatherIcon(currentForecast.shortForecast, currentForecast.isDaytime, "large")}
								</div>
								<div className="text-8xl  md:text-8xl font-bold text-white mb-2">{currentForecast.temperature}°</div>
								<div className="text-xl text-cyan-300 uppercase tracking-wider mb-2">
									{currentForecast.shortForecast}
								</div>
								<div className="text-green-300 text-sm font-mono px-4">{currentForecast.detailedForecast}</div>
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
							<div className="grid grid-cols-2 gap-4">
								<div className="bg-black border-2 border-blue-400 p-4 rounded hover:border-blue-600">
									<Wind className="w-8 h-8 text-blue-400 mx-auto mb-2" />
									<div
										className="text-blue-300 text-xs uppercase text-center hover:text-blue-500"
										// style={{ animationDelay: `${Math.random() * 2}s`, animationDuration: `${Math.random() * 5}s` }}
									>
										Wind
									</div>
									<div className="text-white text-xl font-bold text-center">{currentForecast.windSpeed}</div>
									<div className="text-blue-300 text-sm text-center ">{currentForecast.windDirection}</div>
								</div>

								<div className="bg-black border-2 border-cyan-400 p-4 rounded hover:border-cyan-600">
									<Droplets className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
									<div
										className="text-cyan-300 text-xs uppercase text-center hover:text-cyan-500"
										// style={{ animationDelay: `${Math.random() * 2}s`, animationDuration: `${Math.random() * 5}s` }}
									>
										Precipitation
									</div>
									<div className="text-white text-xl font-bold text-center">
										{currentForecast.probabilityOfPrecipitation.replace("wmoUnit:percent", "%")}
									</div>
								</div>

								<div className="bg-black border-2 border-purple-400 p-4 rounded col-span-2 hover:border-purple-600 gentle-neon">
									<div
										className="text-purple-300 text-xs uppercase text-center mb-2 hover:text-purple-500"
										style={{ animationDelay: `${Math.random() * 2}s`, animationDuration: `${Math.random() * 5}s` }}
									>
										Temperature Trend
									</div>
									<div className="text-white text-lg font-bold text-center">
										{currentForecast.temperatureTrend || "Steady"}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Forecast Grid */}
				<div className="max-w-6xl mx-auto">
					<h3 className="text-3xl font-bold text-yellow-300 mb-4 uppercase tracking-wider text-center">
						📡 Extended Forecast 📡
					</h3>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
						{upcomingForecasts.map((forecast, index) => {
							return (
								<div
									key={index}
									className="bg-gray-900 border-2 border-cyan-400 rounded-lg p-4 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30"
								>
									{/* Time Period */}
									{/* <div className="text-center mb-3">
										<div className="text-cyan-300 text-xs font-bold uppercase">
											{forecast.isDaytime ? "☀️ Day" : "🌙 Night"}
										</div>
										<div className="text-green-300 text-xs font-mono">{forecastTime.date}</div>
									</div> */}

									{/* Icon */}
									<div className="flex justify-center mb-2">
										{getWeatherIcon(forecast.shortForecast, forecast.isDaytime, "small")}
									</div>

									{/* Temperature */}
									<div className="text-center mb-2">
										<div className="text-4xl font-bold text-white">{forecast.temperature}°</div>
									</div>

									{/* Condition */}
									<div className="text-yellow-300 text-xs text-center uppercase mb-2">{forecast.shortForecast}</div>

									{/* Additional Info */}
									<div className="border-t border-cyan-400/30 pt-2 space-y-1">
										<div className="flex items-center justify-between text-xs">
											<span className="text-blue-300">💧</span>
											<span className="text-white font-mono">
												{forecast.probabilityOfPrecipitation.replace("wmoUnit:percent", "%")}
											</span>
										</div>
										<div className="flex items-center justify-between text-xs">
											<span className="text-green-300">💨</span>
											<span className="text-white font-mono">
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
				{props.forecast.alerts && props.forecast.alerts.length > 0 && (
					<div className="max-w-6xl mx-auto mt-8">
						<h3 className="text-3xl font-bold text-red-400 mb-4 uppercase tracking-wider text-center animate-pulse">
							⚠️ Weather Alerts ⚠️
						</h3>

						<div className="space-y-4">
							{props.forecast.alerts.slice(0, 3).map((alert, index) => (
								<div
									key={index}
									className="bg-red-900 border-4 border-yellow-400 rounded-lg p-6 shadow-2xl shadow-red-500/50"
								>
									<div className="flex items-start space-x-4">
										<div className="flex-shrink-0">
											<div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
												<span className="text-red-900 text-2xl font-bold">
													<TriangleAlert />
												</span>
											</div>
										</div>

										<div className="flex-1">
											<h4 className="text-yellow-300 text-xl font-bold uppercase mb-2">{alert.event}</h4>

											<p className="text-red-200 font-mono text-sm mb-3">{alert.headline}</p>

											{alert.description && (
												<p className="text-red-300 text-sm mb-3 leading-relaxed text-justify">{alert.description}</p>
											)}

											<div className="flex flex-wrap gap-4 text-xs font-mono">
												<div className="bg-black border border-yellow-400 px-2 py-1 rounded">
													<span className="text-yellow-400">SEVERITY:</span>{" "}
													<span className="text-white">{alert.severity}</span>
												</div>
												<div className="bg-black border border-yellow-400 px-2 py-1 rounded">
													<span className="text-yellow-400">URGENCY:</span>{" "}
													<span className="text-white">{alert.urgency}</span>
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
	const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true }
	const dateOptions = { weekday: "short", month: "short", day: "numeric" }

	return {
		time: date.toLocaleTimeString("en-US", timeOptions),
		date: date.toLocaleDateString("en-US", dateOptions)
	}
}

const getWeatherIcon = (shortForecast: string, isDaytime: boolean, size: "small" | "large") => {
	const forecast = shortForecast.toLowerCase()
	const iconClass = size === "small" ? "w-16 h-16" : "w-20 h-20"

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
