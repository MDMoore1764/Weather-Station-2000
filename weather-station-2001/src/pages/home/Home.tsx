import AppTitle from "./app_title/AppTitle"
import { useHomePageContext } from "./state/StateContext"
import AppFooter from "./app_footer/AppFooter"
import { HomePageStateContextProvider } from "./state/HomePageStateContextProvider"
import AddressForm from "./address_form/AddressForm"
import LoadingPage from "./loading_page/LoadingPage"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { handleErrorResponse } from "../../apis/weather_client/WeatherClient"
import { USAAddressParser } from "../../utilities/USAAddressParser"
import { ValidationErrorModal } from "./address_form/ValidationErrorModal"
import { useEffect } from "react"
import type { TForecast } from "../../apis/weather_client/WeatherClient.types"
import WeatherDisplay from "./weather_display_page/WeatherDisplay"

const homePageQueryClient = new QueryClient()

function HomePage() {
	const homePageContext = useHomePageContext()

	const forecastQuery = useQuery({
		queryKey: ["forecast", homePageContext.submissionState],
		enabled: homePageContext.submissionState != null,
		queryFn: async () => {
			const query = homePageContext.submissionState

			if (query == null) {
				throw new Error("Query is null.")
			}

			if (typeof query === "object" && "latitude" in query && "longitude" in query) {
				const url = new URL(
					`forecast/${import.meta.env.VITE_FORECAST_API_VERSION}/ByCoordinates?x=${query.longitude}&y=${
						query.latitude
					}`,
					import.meta.env.VITE_FORECAST_API_URL
				)

				const response = await fetch(url)

				if (response.ok) {
					return (await response.json()) as TForecast
				}

				await handleErrorResponse(response)
				return
			}

			let streetNumber = "",
				streetName = "",
				state = "",
				city = "",
				postalCode = ""

			if (typeof query == "string") {
				const addressParser = new USAAddressParser(query)

				streetNumber = addressParser.streetNumber || ""
				state = addressParser.state || ""
				city = addressParser.city || ""
				postalCode = addressParser.zipCode || ""
				streetName = addressParser.streetName || ""
			} else {
				streetNumber = query.streetNumber || ""
				state = query.state || ""
				city = query.city || ""
				postalCode = query.postalCode || ""
				streetName = query.streetName || ""
			}

			const pathParts: string[] = []

			if (streetNumber) {
				pathParts.push(`structureNumber=${encodeURIComponent(streetNumber)}`)
			}

			if (streetName) {
				pathParts.push(`streetName=${encodeURIComponent(streetName)}`)
			}

			if (state) {
				pathParts.push(`state=${encodeURIComponent(state)}`)
			}

			if (city) {
				pathParts.push(`city=${encodeURIComponent(city)}`)
			}

			if (postalCode) {
				pathParts.push(`postalCode=${encodeURIComponent(postalCode)}`)
			}

			const path = `forecast/${import.meta.env.VITE_FORECAST_API_VERSION}/ByAddress?${pathParts.join("&")}`

			const url = new URL(path, import.meta.env.VITE_FORECAST_API_URL)

			const response = await fetch(url)

			if (response.ok) {
				return (await response.json()) as TForecast
			}

			await handleErrorResponse(response)
			return
		},

		staleTime: 60 * 5 * 1000, // cache for 5 minutes
		retry: false
	})

	// useEffect(() => {
	// 	// If loading for the first time, set to loading weather state.
	// 	if (forecastQuery.isLoading) {
	// 		homePageContext.dispatch({ action: "setAppState", payload: "loading_weather" })
	// 		return
	// 	}

	// 	if (forecastQuery.error) {
	// 		homePageContext.dispatch({ action: "setAppState", payload: "error" })
	// 		return
	// 	}

	// 	if (forecastQuery.data) {
	// 		homePageContext.dispatch({ action: "setAppState", payload: "weather_display" })
	// 		return
	// 	}

	// 	homePageContext.dispatch({ action: "setAppState", payload: "address_input" })
	// }, [forecastQuery.isLoading, forecastQuery.error, forecastQuery.data, homePageContext])

	useEffect(() => {
		if (forecastQuery.isLoading) {
			homePageContext.dispatch({ action: "setAppState", payload: "loading_weather" })
			return
		}

		if (forecastQuery.error) {
			homePageContext.dispatch({ action: "setAppState", payload: "address_input" })
			homePageContext.dispatch({
				action: "setForecastFetchError",
				payload: forecastQuery.error.message ?? "Unknown error."
			})
			return
		}

		if (forecastQuery.data) {
			homePageContext.dispatch({ action: "setAppState", payload: "weather_display" })
			return
		}
	}, [forecastQuery.error, forecastQuery.isLoading, forecastQuery.data, homePageContext.dispatch])

	return (
		<div className="flex flex-col h-full w-full align-middle">
			{/* CRT Scanlines Effect */}
			<div className="absolute inset-0 pointer-events-none z-50">
				<div
					className="h-full w-full opacity-20"
					style={{
						background: `repeating-linear-gradient(
                 0deg,
                 transparent,
                 transparent 2px,
                 rgba(0, 255, 0, 0.1) 2px,
                 rgba(0, 255, 0, 0.1) 4px
               )`
					}}
				/>
			</div>
			{(homePageContext.appState === "address_input" || homePageContext.appState === "weather_display") && (
				<AppTitle currentTime={homePageContext.currentTime} />
			)}
			{homePageContext.appState === "address_input" && <AddressForm loading={forecastQuery.isLoading} />}
			{homePageContext.appState === "loading_weather" && <LoadingPage />}
			{homePageContext.appState === "weather_display" && <WeatherDisplay forecast={forecastQuery.data || null} />}
			{homePageContext.validationError && (
				<ValidationErrorModal
					onClose={() => {
						homePageContext.dispatch({
							action: "setValidationError",
							payload: null
						})

						homePageContext.dispatch({ action: "setAppState", payload: "address_input" })
						homePageContext.dispatch({ action: "setSubmissionState", payload: null })
					}}
				/>
			)}
			{homePageContext.fetchError && (
				<ValidationErrorModal
					title="DATA NODE ERROR"
					subtitle={homePageContext.fetchError}
					onClose={() => {
						homePageContext.dispatch({
							action: "setForecastFetchError",
							payload: null
						})

						homePageContext.dispatch({ action: "setAppState", payload: "address_input" })
						homePageContext.dispatch({ action: "setSubmissionState", payload: null })
					}}
				/>
			)}
			<AppFooter />
		</div>
	)
}

export const Home = () => (
	<QueryClientProvider client={homePageQueryClient}>
		<HomePageStateContextProvider>
			<HomePage />
		</HomePageStateContextProvider>
	</QueryClientProvider>
)
