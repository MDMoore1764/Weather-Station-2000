import React from "react"

export type TMusicManagerContext = {
	activeSong: string | null
	playing: boolean
	volume: number // 0 to 1
	currentTime: number // in seconds
	duration: number // in seconds
	play: () => void
	pause: () => void
	changeSong: (songUrl: string) => void
}

export type TMusicManagerProviderState = {
	activeSong: string | null
	playing: boolean
	volume: number // 0 to 1
	currentTime: number // in seconds
	duration: number // in seconds
}

export const MusicManagerContext = React.createContext<TMusicManagerContext>(null!)
export const useMusicManager = () => {
	return React.useContext(MusicManagerContext)
}
