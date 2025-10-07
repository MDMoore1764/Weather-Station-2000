import { useEffect, useReducer } from "react"
import {
	type THomePageStateContext,
	DEFAULT_HOME_PAGE_STATE,
	HomePageStateContext,
	DEFAULT_LOCATION_FORM_STATE,
	type TDistpatchAction
} from "./StateContext"
import { DateTime } from "luxon"

const reducer = (state: THomePageStateContext, value: TDistpatchAction): THomePageStateContext => {
	switch (value.action) {
		case "setOneLineAddress": {
			return {
				...state,
				formState: {
					...state.formState,
					oneLineAddress: value.payload
				}
			}
		}
		case "setAppState": {
			return {
				...state,
				appState: value.payload
			}
		}
		case "setValidationError": {
			return {
				...state,
				validationError: value.payload
			}
		}
		case "setForecastFetchError": {
			return {
				...state,
				fetchError: value.payload
			}
		}
		case "setSubmissionState": {
			return {
				...state,
				submissionState: value.payload
			}
		}
		case "updateCity": {
			return {
				...state,
				formState: {
					...state.formState,
					address: {
						...state.formState.address,
						city: value.payload
					}
				}
			}
		}
		case "updateState": {
			return {
				...state,
				formState: {
					...state.formState,
					address: {
						...state.formState.address,
						state: value.payload
					}
				}
			}
		}
		case "updateStreetName": {
			return {
				...state,
				formState: {
					...state.formState,
					address: {
						...state.formState.address,
						streetName: value.payload
					}
				}
			}
		}
		case "updateStreetNumber": {
			return {
				...state,
				formState: {
					...state.formState,
					address: {
						...state.formState.address,

						streetNumber: value.payload
					}
				}
			}
		}
		case "updatePostalCode": {
			return {
				...state,
				formState: {
					...state.formState,
					address: {
						...state.formState.address,
						postalCode: value.payload
					}
				}
			}
		}

		case "clearAddressForm": {
			return {
				...state,
				validationError: null,
				formState: {
					geolocation: null,
					oneLineAddress: "",
					address: {
						...DEFAULT_LOCATION_FORM_STATE
					}
				}
			}
		}
		case "setCurrentTime": {
			return {
				...state,
				currentTime: value.payload
			}
		}
		case "activeSection": {
			return {
				...state,
				activeSection: value.payload
			}
		}
	}

	throw new Error(`Invalid value "${value}" provided.`)
}

export function HomePageStateContextProvider(props: React.PropsWithChildren<unknown>) {
	const [state, dispatch] = useReducer(reducer, DEFAULT_HOME_PAGE_STATE)

	useEffect(() => {
		setInterval(() => {
			dispatch({ action: "setCurrentTime", payload: DateTime.now() })
		}, 1000)
	}, [])

	return <HomePageStateContext.Provider value={{ ...state, dispatch }}>{props.children}</HomePageStateContext.Provider>
}
