import React, { useEffect, useMemo } from "react"
import LoadingBar from "../../../components/loading_bar/LoadingBar"
import { useHomePageContext } from "../state/StateContext"
import { useMusicManager } from "../../../hooks/music-manager/useMusicManager"
const audio = new Audio(`resources/audio/Sonar.mp3`)

type TLoadingPercent = number

type TProps = {
	averageLoadingMs?: number
}

function LoadingPage(props: TProps) {
	const homePageContext = useHomePageContext()
	const musicContext = useMusicManager()
	const averageLoadingMs = useMemo(() => props.averageLoadingMs ?? 2000, [props.averageLoadingMs])
	const [percentState, setPercentState] = React.useState<TLoadingPercent>(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setPercentState((prev) => {
				if (prev >= 100) {
					clearInterval(interval)
					return 100
				}

				return prev + 1000 / averageLoadingMs
			})
		}, 10)
	}, [averageLoadingMs])

	const visbleStateTextSet = useMemo(() => {
		const nTextFields = 10
		const maxTextfields = 10
		const set: number[] = []
		for (let i = 1; i <= nTextFields; i++) {
			if (percentState < i * maxTextfields) {
				break
			}

			set.push(i)
		}

		return set
	}, [percentState])

	const hasPlayedSonar = React.useRef(false)

	useEffect(() => {
		if (musicContext.playing && !hasPlayedSonar.current) {
			hasPlayedSonar.current = true
			audio.volume = 0.3
			audio.playbackRate = 1.0
			audio.loop = false
			audio.currentTime = 0.9
			audio.play()
		}
	}, [musicContext])

	return (
		<div className="text-center mb-4 sm:mb-6 md:mb-8 flex-1 px-2 sm:px-4">
			<button
				className="fixed bottom-2 left-2 text-red-600 border-2 sm:border-4 rounded-full border-red-500 hover:shadow-lg hover:shadow-red-500 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 z-50"
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
				ABORT SCAN
			</button>
			<div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-yellow-400 mb-4 sm:mb-6 animate-bounce font-bold px-2">
				⚡ SCANNING ATMOSPHERE ⚡
			</div>

			<div className="relative flex justify-center items-center mb-4 sm:mb-6 md:mb-8">
				<div className="absolute w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-2 sm:border-4 border-cyan-500 animate-ping opacity-20"></div>
				<div
					className="absolute w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full border-2 sm:border-4 border-pink-500 animate-ping opacity-30"
					style={{ animationDelay: "0.5s" }}
				></div>
				<div
					className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-yellow-500 animate-ping opacity-40"
					style={{ animationDelay: "1s" }}
				></div>

				<div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-spin shadow-2xl shadow-purple-500/80">
					<div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
						<div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 animate-pulse"></div>
					</div>
					<div className="absolute top-0 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1 shadow-lg shadow-cyan-400/80"></div>
					<div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full transform -translate-x-1/2 translate-y-1 shadow-lg shadow-pink-400/80"></div>
					<div className="absolute left-0 top-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full transform -translate-x-1 -translate-y-1/2 shadow-lg shadow-yellow-400/80"></div>
					<div className="absolute right-0 top-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full transform translate-x-1 -translate-y-1/2 shadow-lg shadow-green-400/80"></div>
				</div>
			</div>

			<LoadingBar text={"ANALYZING WEATHER DATA..."} percent={percentState} />

			<div className="space-y-1 sm:space-y-2 font-mono text-xs sm:text-sm text-left max-w-xs sm:max-w-sm md:max-w-md mx-auto px-2">
				{visbleStateTextSet[0] && (
					<div className="text-pink-400 animate-pulse">▶ Scanning for weather satellites...</div>
				)}
				{visbleStateTextSet[1] && (
					<div className="text-pink-600 animate-pulse">▶ Triangulating target weather satellite...</div>
				)}
				{visbleStateTextSet[2] && (
					<div className="text-purple-400 animate-pulse">▶ Connecting to weather satellites...</div>
				)}
				{visbleStateTextSet[3] && (
					<div className="text-purple-600 animate-pulse">▶ Performing atmospherescape scan...</div>
				)}
				{visbleStateTextSet[4] && (
					<div className="text-yellow-400 animate-pulse">▶ Performing atmospheric anomaly scan...</div>
				)}
				{visbleStateTextSet[5] && <div className="text-yellow-600 animate-pulse">▶ Processing atmospheric data...</div>}
				{visbleStateTextSet[6] && (
					<div className="text-orange-400 animate-pulse">▶ Calculating weather patterns...</div>
				)}
				{visbleStateTextSet[7] && <div className="text-orange-600 animate-pulse">▶ Interpolating actions...</div>}
				{visbleStateTextSet[8] && <div className="text-cyan-400 animate-pulse">▶ Assessing anomaly severity...</div>}
				{visbleStateTextSet[9] && <div className="text-cyan-600 animate-pulse">▶ Finalizing forecast analysis...</div>}
			</div>

			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div
					className="absolute top-20 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-60"
					style={{ animationDuration: `${0 * averageLoadingMs}ms` }}
				></div>
				<div
					className="absolute top-32 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-bounce opacity-60"
					style={{ animationDuration: `${0.25 * averageLoadingMs}ms` }}
				></div>
				<div
					className="absolute top-28 left-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-bounce opacity-60"
					style={{ animationDuration: `${0.5 * averageLoadingMs}ms` }}
				></div>
				<div
					className="absolute top-36 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-bounce opacity-60"
					style={{ animationDuration: `${0.75 * averageLoadingMs}ms` }}
				></div>
			</div>

			<div className="mt-4 sm:mt-6 md:mt-8 relative">
				<div className="w-48 h-24 sm:w-56 sm:h-28 md:w-64 md:h-32 mx-auto border border-cyan-400/30 relative overflow-hidden">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `
                    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                  `,
							backgroundSize: "20px 20px"
						}}
					></div>

					<div
						className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-yellow-400 to-transparent animate-pulse opacity-80"
						style={{
							left: `${percentState}%`,
							animation: "scan 2s ease-in-out infinite alternate"
						}}
					></div>
				</div>

				<div className="text-cyan-400 text-xs sm:text-sm font-mono mt-2 uppercase tracking-wider">
					RADAR SCANNING...
				</div>
			</div>
		</div>
	)
}

export default LoadingPage
