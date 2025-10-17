import React from "react"

export type TChangeSong = {
	(songUrl: string, loop: true): Promise<void>
	(songUrl: string, loop: false): Promise<never>
	(songUrl: string, loop: boolean): Promise<void | never>
}

export type TMusicManagerContext = {
	changeSong: TChangeSong
	activeSong: string | null
	playing: boolean
	volume: number // 0 to 1
	currentTime: number // in seconds
	duration: number // in seconds
	play: () => void
	pause: () => void
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
