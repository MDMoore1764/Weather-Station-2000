import { useEffect, useReducer } from "react"
import {
	type THomePageStateContext,
	type TDispatchValue,
	DEFAULT_HOME_PAGE_STATE,
	HomePageStateContext,
	DEFAULT_LOCATION_FORM_STATE
} from "./StateContext"

const reducer = <TKey extends keyof THomePageStateContext, TValue extends THomePageStateContext[TKey]>(
	state: THomePageStateContext,
	value: TDispatchValue<TKey, TValue>
): THomePageStateContext => {
	switch (value.action) {
		case "updateCity": {
			return {
				...state,
				address: {
					...state.address,
					city: value.payload
				}
			}
		}
		case "updateState": {
			return {
				...state,
				address: {
					...state.address,
					state: value.payload
				}
			}
		}
		case "updateStreetName": {
			return {
				...state,
				address: {
					...state.address,
					streetName: value.payload
				}
			}
		}
		case "updateStreetNumber": {
			return {
				...state,
				address: {
					...state.address,

					streetNumber: value.payload
				}
			}
		}
		case "updatePostalCode": {
			return {
				...state,
				address: {
					...state.address,
					postalCode: value.payload
				}
			}
		}

		case "clearAddressForm": {
			return {
				...state,
				validationError: null,
				address: {
					...DEFAULT_LOCATION_FORM_STATE
				}
			}
		}

		case "activeSection": {
			return {
				...state,
				activeSection: value.payload
			}
		}

		case "toggleAudio": {
			debugger
			console.log("audio toggled!")
			// if (!state.mainBackgroundAudio) {
			// 	return state
			// }

			if (state.mainBackgroundAudio.paused) {
				state.mainBackgroundAudio.play().catch((error) => {
					console.error("Error playing background audio:", error)
				})
			} else {
				state.mainBackgroundAudio.pause()
			}

			return {
				...state,
				audioPlaying: !state.audioPlaying
			}
		}
	}

	return {
		...state,
		[value.action]: value.payload
	}
}

export function HomePageStateContextProvider(props: React.PropsWithChildren<unknown>) {
	const [state, dispatch] = useReducer(reducer, DEFAULT_HOME_PAGE_STATE)

	useEffect(() => {
		state.audioPlaying = true
		state.mainBackgroundAudio.loop = true
		state.mainBackgroundAudio.volume = 0.1
		state.mainBackgroundAudio.play().catch((error) => {
			console.error("Error playing background audio:", error)
		})
	}, [state, state.mainBackgroundAudio])

	return <HomePageStateContext.Provider value={{ ...state, dispatch }}>{props.children}</HomePageStateContext.Provider>
}
