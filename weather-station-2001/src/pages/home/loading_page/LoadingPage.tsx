import React, { useEffect, useMemo } from "react"
import LoadingBar from "../../../components/loading_bar/LoadingBar"

type TLoadingPercent = number

type TProps = {
	averageLoadingMs?: number
}

function LoadingPage(props: TProps) {
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

	return (
		<div className="text-center mb-8 flex-1">
			<div className="text-6xl text-yellow-400 mb-6 animate-bounce font-bold">⚡ SCANNING ATMOSPHERE ⚡</div>

			<div className="relative flex justify-center items-center mb-8">
				<div className="absolute w-32 h-32 rounded-full border-4 border-cyan-500 animate-ping opacity-20"></div>
				<div
					className="absolute w-24 h-24 rounded-full border-4 border-pink-500 animate-ping opacity-30"
					style={{ animationDelay: "0.5s" }}
				></div>
				<div
					className="absolute w-16 h-16 rounded-full border-4 border-yellow-500 animate-ping opacity-40"
					style={{ animationDelay: "1s" }}
				></div>

				<div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-spin shadow-2xl shadow-purple-500/80">
					<div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
						<div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 animate-pulse"></div>
					</div>
					<div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1 shadow-lg shadow-cyan-400/80"></div>
					<div className="absolute bottom-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full transform -translate-x-1/2 translate-y-1 shadow-lg shadow-pink-400/80"></div>
					<div className="absolute left-0 top-1/2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-x-1 -translate-y-1/2 shadow-lg shadow-yellow-400/80"></div>
					<div className="absolute right-0 top-1/2 w-2 h-2 bg-green-400 rounded-full transform translate-x-1 -translate-y-1/2 shadow-lg shadow-green-400/80"></div>
				</div>
			</div>

			<LoadingBar text={"ANALYZING WEATHER DATA..."} percent={percentState} />

			<div className="space-y-2 font-mono text-sm text-left h-65 w-80" style={{ margin: "0 auto" }}>
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
					<div className="text-yellow-400 animate-pulse">▶ Performing atmospheric anomaly scan..</div>
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

			<div className="mt-8 relative">
				<div className="w-64 h-32 mx-auto border border-cyan-400/30 relative overflow-hidden">
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

				<div className="text-cyan-400 text-xs font-mono mt-2 uppercase tracking-wider">RADAR SCANNING...</div>
			</div>
		</div>
	)
}

export default LoadingPage
