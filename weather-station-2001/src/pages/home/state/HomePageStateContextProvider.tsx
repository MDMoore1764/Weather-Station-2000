import { useReducer } from "react"
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
	}

	return {
		...state,
		[value.action]: value.payload
	}
}

export function HomePageStateContextProvider(props: React.PropsWithChildren<unknown>) {
	const [state, dispatch] = useReducer(reducer, DEFAULT_HOME_PAGE_STATE)

	return <HomePageStateContext.Provider value={{ ...state, dispatch }}>{props.children}</HomePageStateContext.Provider>
}
