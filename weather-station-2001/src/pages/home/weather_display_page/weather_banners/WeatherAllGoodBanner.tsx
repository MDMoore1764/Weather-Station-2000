import type { TAlert } from "../../../../apis/weather_client/WeatherClient.types"

type TProps = { activeAlerts: TAlert[] }

function WeatherAlertsBanner(props: TProps) {
	if (props.activeAlerts.length > 0) return null

	const combinedMessage =
		". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  NO ANOMOLIES DETECTED. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  ALL NODES CLEAR. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . SCANNING. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "

	const estimatedMessagePixels = combinedMessage.length * 22
	const screenWidth = window.innerWidth
	const animationPercent = (estimatedMessagePixels / screenWidth) * 100
	const animationSeconds = (2 * animationPercent) / 5

	return (
		<div>
			<div className=" w-full overflow-hidden whitespace-nowrap tracking-wider bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 -z-10 py-3 shadow-xl shadow-cyan-500/50">
				<div className="animate-marquee whitespace-nowrap text-yellow-300 text-xl font-bold tracking-wider animation-pulse">
					{combinedMessage}
				</div>
				<style jsx>{`
					@keyframes marquee {
						0% {
							transform: translateX(0%);
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
				<span className="text-red-500 text-6xl font-bold text-shadow-md text-shadow-amber-600"></span>
			</div>
		</div>
	)
}

export default WeatherAlertsBanner
