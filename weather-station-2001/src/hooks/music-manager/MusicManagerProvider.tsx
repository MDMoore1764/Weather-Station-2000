import React, { useCallback } from "react"
import { MusicManagerContext, type TMusicManagerProviderState } from "./UseMusicManager"

export const MusicManagerProvider = (props: React.PropsWithChildren<unknown>) => {
	const audioRef = React.useRef<HTMLAudioElement | null>(null)

	const [musicManagerState, setMusicManagerState] = React.useState<TMusicManagerProviderState>({
		activeSong: null,
		playing: false,
		volume: 0.1,
		currentTime: 0,
		duration: 0
	})

	const play = useCallback(() => {
		if (!audioRef.current) {
			return
		}

		audioRef.current.play()
		setMusicManagerState((prev) => ({ ...prev, playing: true }))
	}, [])

	const pause = useCallback(() => {
		if (!audioRef.current) {
			return
		}
		audioRef.current.pause()
		setMusicManagerState((prev) => ({ ...prev, playing: false }))
	}, [])

	const changeSong = useCallback((songUrl: string) => {
		if (audioRef.current?.src === songUrl) {
			return
		}

		if (audioRef.current) {
			audioRef.current.pause()
			audioRef.current.src = songUrl
			audioRef.current.play()
			setMusicManagerState((prev) => ({ ...prev, activeSong: songUrl, playing: true }))
			return
		}

		audioRef.current = new Audio(songUrl)
		audioRef.current.volume = musicManagerState.volume
		audioRef.current.play()

		audioRef.current.onpause = () => {
			setMusicManagerState((prev) => ({ ...prev, playing: false }))
		}

		audioRef.current.onplay = () => {
			setMusicManagerState((prev) => ({ ...prev, playing: true }))
		}

		audioRef.current.ontimeupdate = () => {
			if (!audioRef.current) {
				return
			}
			setMusicManagerState((prev) => ({
				...prev,
				currentTime: audioRef.current!.currentTime,
				duration: audioRef.current!.duration
			}))
		}
	}, [])

	return (
		<MusicManagerContext.Provider value={{ ...musicManagerState, changeSong, play, pause }}>
			{props.children}
		</MusicManagerContext.Provider>
	)
}
