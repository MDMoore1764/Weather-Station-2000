import { useEffect } from "react"
import type { TAlert } from "../../../../apis/weather_client/WeatherClient.types"
import { DateTime } from "luxon"
import { useMusicManager } from "../../../../hooks/music-manager/UseMusicManager"

type TProps = { activeAlerts: TAlert[] }

function WeatherAlertsBanner(props: TProps) {
	const musicManager = useMusicManager()

	useEffect(() => {
		if (props.activeAlerts.length > 0) {
			musicManager.changeSong("/resources/audio/ActiveAlert.mp3")
		}
	}, [props.activeAlerts.length])

	if (props.activeAlerts.length === 0) return null

	const combinedMessage = props.activeAlerts
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
