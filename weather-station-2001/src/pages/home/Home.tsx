import AppTitle from "./app_title/AppTitle"
import { useHomePageContext } from "./state/StateContext"
import AppFooter from "./app_footer/AppFooter"
import { HomePageStateContextProvider } from "./state/HomePageStateContextProvider"
import AddressForm from "./address_form/AddressForm"
import LoadingPage from "./loading_page/LoadingPage"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { fetchForecastQueryOptions } from "../../apis/weather_client/WeatherClient"
import { ValidationErrorModal } from "./address_form/ValidationErrorModal"
import { useEffect } from "react"
import WeatherDisplay from "./weather_display_page/WeatherDisplay"
import { MusicManagerProvider } from "../../hooks/music-manager/MusicManagerProvider"
import { useMusicManager } from "../../hooks/music-manager/useMusicManager"
import { BoomBox, VolumeOff } from "lucide-react"
import { ThemeProvider } from "../../themes/ThemeContext"
import { ThemeSelector } from "../../components/ThemeSelector"

const homePageQueryClient = new QueryClient()

function HomePage() {
	const homePageContext = useHomePageContext()
	const musicManager = useMusicManager()

	const forecastQuery = useQuery(fetchForecastQueryOptions(homePageContext.submissionState))

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
			<ThemeSelector />
			{homePageContext.appState === "address_input" && <AppTitle currentTime={homePageContext.currentTime} />}
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
			<div className="fixed right-4 bottom-4 z-50">
				<button
					onClick={() => (musicManager.playing ? musicManager.pause() : musicManager.play())}
					className={`${
						!musicManager.playing ? "" : "animate-pulse"
					} transition-transform duration-200  bg-black bg-opacity-50 border-2 border-purple-400 text-purple-300 p-2 sm:p-3 rounded-full shadow-md hover:shadow-purple-500/50 hover:bg-purple-600 hover:text-white`}
				>
					<BoomBox className="w-5 h-5 sm:w-6 sm:h-6" />
					{musicManager.playing ? <span className="sr-only">Pause</span> : <span className="sr-only">Play</span>}
				</button>
			</div>
		</div>
	)
}

export const Home = () => (
	<ThemeProvider>
		<QueryClientProvider client={homePageQueryClient}>
			<MusicManagerProvider>
				<HomePageStateContextProvider>
					<HomePage />
				</HomePageStateContextProvider>
			</MusicManagerProvider>
		</QueryClientProvider>
	</ThemeProvider>
)
