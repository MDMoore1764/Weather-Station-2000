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

export type THomePageStateContext = {
	currentTime: DateTime
	formState: {
		address: TLocationFormState
		geolocation: TGeolocationFormState | null
		oneLineAddress: string
	}
	submissionState: TLocationFormState | TGeolocationFormState | string | null
	appState: AppState
	validationError: ReactNode | null
	fetchError: string | null
	audioPlaying: boolean
	mainBackgroundAudio: HTMLAudioElement
	activeSection: TSection
	dispatch: (value: TDistpatchAction) => void
}

export type TDistpatchAction =
	| {
			action: "updateStreetNumber"
			payload: string
	  }
	| {
			action: "setCurrentTime"
			payload: DateTime
	  }
	| {
			action: "setOneLineAddress"
			payload: string
	  }
	| {
			action: "setValidationError"
			payload: string | null
	  }
	| {
			action: "setForecastFetchError"
			payload: string | null
	  }
	| {
			action: "setSubmissionState"
			payload: TLocationFormState | TGeolocationFormState | string | null
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
			action: "setAppState"
			payload: AppState
	  }
	| {
			action: "toggleAudio"
	  }

export const DEFAULT_HOME_PAGE_STATE: THomePageStateContext = {
	currentTime: DateTime.now(),
	formState: {
		address: { ...DEFAULT_LOCATION_FORM_STATE },
		oneLineAddress: "",
		geolocation: null
	},
	submissionState: null,
	appState: "address_input",
	validationError: null,
	audioPlaying: true,
	mainBackgroundAudio: new Audio("/public/resources/audio/BachgroundMuseik.mp3"),
	activeSection: null,
	dispatch: () => void 0,
	fetchError: null
}

export const HomePageStateContext = createContext<THomePageStateContext>({ ...DEFAULT_HOME_PAGE_STATE })

export function useHomePageContext() {
	return useContext(HomePageStateContext)
}
