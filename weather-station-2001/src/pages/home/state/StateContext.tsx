import { createContext, useContext, type ReactNode } from "react"
import { DateTime } from "luxon"
import type { TGeolocationFormState, TLocationFormState } from "../home.types"

export type AppState = "address_input" | "weather_display" | "loading_weather" | "error" | null

export const DEFAULT_LOCATION_FORM_STATE: TLocationFormState = {
	city: null,
	postalCode: null,
	state: null,
	streetName: null,
	streetNumber: null
}

export type TSection = "onelineaddress" | "address" | null

export type TDispatchValue<TKey extends keyof THomePageStateContext, TValue extends THomePageStateContext[TKey]> =
	| {
			action: TKey
			payload: TValue
	  }
	| TDistpatchAction

export type THomePageStateContext = {
	currentTime: DateTime
	address: TLocationFormState
	geolocation?: TGeolocationFormState
	weatherLoading: boolean
	appState: AppState
	oneLineAddress: string | null
	validationError: ReactNode | null
	audioPlaying: boolean
	mainBackgroundAudio: HTMLAudioElement
	activeSection: TSection
	dispatch: <TKey extends keyof THomePageStateContext, TValue extends THomePageStateContext[TKey]>(
		value: TDispatchValue<TKey, TValue>
	) => void
}

export type TDistpatchAction =
	| {
			action: "updateStreetNumber"
			payload: string
	  }
	| {
			action: "updateCity"
			payload: string
	  }
	| {
			action: "updateState"
			payload: string
	  }
	| {
			action: "updateStreetName"
			payload: string
	  }
	| {
			action: "updatePostalCode"
			payload: string
	  }
	| {
			action: "clearAddressForm"
	  }
	| {
			action: "activeSection"
			payload: TSection
	  }
	| {
			action: "toggleAudio"
	  }

export const DEFAULT_HOME_PAGE_STATE: THomePageStateContext = {
	currentTime: DateTime.now(),
	address: { ...DEFAULT_LOCATION_FORM_STATE },
	appState: "address_input",
	oneLineAddress: null,
	validationError: null,
	geolocation: undefined,
	weatherLoading: false,
	audioPlaying: true,
	mainBackgroundAudio: new Audio("/public/resources/audio/BachgroundMuseik.mp3"),
	activeSection: null,
	dispatch: () => void 0
}

export const HomePageStateContext = createContext<THomePageStateContext>({ ...DEFAULT_HOME_PAGE_STATE })

export function useHomePageContext() {
	return useContext(HomePageStateContext)
}
