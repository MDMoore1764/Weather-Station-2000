import { useEffect } from "react"
import type { TAlert } from "../../../../apis/weather_client/WeatherClient.types"
import { DateTime } from "luxon"
import { useMusicManager } from "../../../../hooks/music-manager/UseMusicManager"

type TProps = { alerts: TAlert[] }

function WeatherAlertsBanner(props: TProps) {
	const musicManager = useMusicManager()
	const activeAlerts = props.alerts.filter((a) => DateTime.fromISO(a.expires) > DateTime.now())

	useEffect(() => {
		if (activeAlerts.length > 0) {
			musicManager.changeSong("/public/resources/audio/ActiveAlert.mp3")
		}
	}, [activeAlerts.length])

	if (activeAlerts.length === 0) return null

	const combinedMessage = activeAlerts
		.map((alert) => {
			const icon = getAlertIcon(alert.severity)

			return `${icon} ${alert.event}: ${alert.headline} ${icon}`
		})
		.join(" • ")

	const estimatedMessagePixels = combinedMessage.length * 15 // Rough estimate: 16 pixels per character
	const screenWidth = window.innerWidth
	const animationPercent = (estimatedMessagePixels / screenWidth) * 100
	const animationSeconds = (2 * animationPercent) / 6

	return (
		<div>
			<div className="border-t-4 border-b-4 border-yellow-500 w-full bg-red-600/90 py-4 overflow-hidden whitespace-nowrap tracking-wider">
				<div className="animate-marquee whitespace-nowrap text-yellow-300 text-xl font-bold tracking-wider ml-20">
					{combinedMessage}
				</div>
				<style jsx>{`
					@keyframes marquee {
						0% {
							transform: translateX(100%);
						}
						100% {
							transform: translateX(-${animationPercent}%);
						}
					}

					.animate-marquee {
						animation: marquee ${animationSeconds}s linear infinite;
					}
				`}</style>
			</div>

			<div className="z-10 rounded-full p-2 neon m-auto w-48">
				<span className="text-red-500 text-6xl font-bold text-shadow-md text-shadow-amber-600">ALERT</span>
			</div>

			<style jsx>{`
				.neon {
					font-size: 3rem;
					font-family: "Arial Black", sans-serif;
					font-weight: bold;
					color: #fff;
					opacity: 1;
					animation: flicker 3s infinite alternate;
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
			`}</style>
		</div>
	)
}

export default WeatherAlertsBanner

function getAlertIcon(severity: string) {
	switch (severity) {
		case "Severe":
			return "🚨"
		case "Moderate":
			return "⚠️"
		default:
			return "ℹ️"
	}
}

// const WeatherAlertsBanner = (props: { alerts: TAlert[] }) => {
// 	const alerts = props.alerts
// 	if (!alerts || alerts.length === 0) return null

// 	// Filter for active/current alerts
// 	const activeAlerts = alerts
// 	// .filter((alert) => {
// 	// 	const expiresDate = new Date(alert.expires)
// 	// 	return expiresDate > new Date()
// 	// })

// 	if (activeAlerts.length === 0) return null

// 	// Create scrolling message from all active alerts
// 	const scrollingMessage = activeAlerts
// 		.map((alert) => {
// 			const severityIcon = alert.severity === "Severe" ? "🚨" : alert.severity === "Moderate" ? "⚠️" : "ℹ️"
// 			return `${severityIcon} ${alert.event.toUpperCase()}: ${alert.headline} ${severityIcon}`
// 		})
// 		.join(" • ")

// 	return (
// 		<div className="bg-red-600 border-y-4 border-yellow-400 py-3 overflow-hidden relative shadow-lg shadow-red-500/50">
// 			<div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-600 animate-pulse opacity-50"></div>

// 			<div className="relative flex items-center">
// 				{/* Pulsing Alert Icon */}
// 				<div className="absolute left-4 z-10 bg-yellow-400 rounded-full p-2 animate-bounce">
// 					<span className="text-red-900 text-2xl font-bold">⚠</span>
// 				</div>

// 				{/* Scrolling Text */}
// 				<div className="animate-marquee whitespace-nowrap text-yellow-300 text-xl font-bold tracking-wider pl-20">
// 					{scrollingMessage}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
