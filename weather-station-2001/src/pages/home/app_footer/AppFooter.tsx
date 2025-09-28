import { useCallback } from "react"
import { useHomePageContext } from "../state/StateContext"
import { BoomBox, VolumeOff } from "lucide-react"

function AppFooter() {
	const homePageContext = useHomePageContext()

	const toggleAudio = useCallback(() => {
		if (!homePageContext.mainBackgroundAudio) {
			return
		}

		if (homePageContext.mainBackgroundAudio.paused) {
			homePageContext.mainBackgroundAudio.play().catch((error) => {
				console.error("Error playing background audio:", error)
			})
		} else {
			homePageContext.mainBackgroundAudio.pause()
		}
	}, [homePageContext.mainBackgroundAudio])

	// const hoverSound = useRef(new Audio("/public/resources/audio/hover-sound.mp3"));
	return (
		<div>
			<div className="text-center mt-12 text-cyan-400 font-mono text-sm mb-6">
				<span className="hover:text-pink-400 duration-200">RETRO WEATHER NETWORK © 2000</span> •{" "}
				<span className="hover:text-purple-500 hover:cursor-grab duration-200">ALWAYS ONLINE </span> •{" "}
				<span className="hover: hover:text-orange-600 hover:cursor-crosshair duration-200">ALWAYS WATCHING</span>
			</div>
			<div>
				<button
					onClick={toggleAudio}
					className={`${
						homePageContext.mainBackgroundAudio.paused ? "" : "animate-pulse"
					} transition-transform duration-200  bg-black bg-opacity-50 border-2 border-purple-400 text-purple-300 p-3 rounded-full shadow-md hover:shadow-purple-500/50 hover:bg-purple-600 hover:text-white`}
				>
					{homePageContext.mainBackgroundAudio.paused ? <BoomBox /> : <VolumeOff />}
				</button>
			</div>
		</div>
	)
}

export default AppFooter
