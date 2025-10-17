import React, { useCallback } from "react"
import { MusicManagerContext, type TMusicManagerProviderState } from "./useMusicManager"

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

	const changeSong = useCallback(
		(songUrl: string, loop: boolean) => {
			songUrl = import.meta.env.PROD ? `${import.meta.env.BASE_URL}/${songUrl}` : `/public/${songUrl}`
			const fullSongURL = `${window.location.origin}${songUrl}`
			if (audioRef.current?.src === fullSongURL) {
				return Promise.resolve()
			}

			if (audioRef.current) {
				audioRef.current.pause()
				audioRef.current.src = songUrl
				audioRef.current.loop = loop
				audioRef.current.play()
				setMusicManagerState((prev) => ({ ...prev, activeSong: songUrl, playing: true }))
			} else {
				audioRef.current = new Audio(songUrl)
				audioRef.current.volume = musicManagerState.volume
				audioRef.current.loop = loop
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
			}

			if (loop) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				return new Promise<never>((_r) => null)
			}

			return new Promise<void>((resolve) => {
				audioRef.current?.addEventListener("timeupdate", () => {
					const currentTime = audioRef.current?.currentTime ?? 0 // seconds
					const duration = audioRef.current?.duration ?? 0

					if (currentTime / 1000.0 >= duration) {
						resolve()
					}
				})
			})
		},
		[musicManagerState.volume]
	)

	return (
		<MusicManagerContext.Provider value={{ ...musicManagerState, changeSong, play, pause }}>
			{props.children}
		</MusicManagerContext.Provider>
	)
}
