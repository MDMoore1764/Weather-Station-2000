import { useEffect } from "react"
import AppTitle from "./app_title/AppTitle"
import { useHomePageContext } from "./state/StateContext"
import { DateTime } from "luxon"
import AppFooter from "./app_footer/AppFooter"
import { HomePageStateContextProvider } from "./state/HomePageStateContextProvider"
import AddressForm from "./address_form/AddressForm"
import LoadingPage from "./loading_page/LoadingPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const homePageQueryClient = new QueryClient()

function HomePage() {
	const homePageContext = useHomePageContext()

	// useEffect(() => {
	// 	const timer = setInterval(() => {
	// 		homePageContext.dispatch({
	// 			action: "currentTime",
	// 			payload: DateTime.now()
	// 		})
	// 	}, 1000)
	// 	return () => clearInterval(timer)
	// }, [homePageContext, homePageContext.dispatch])

	return (
		<div className="flex flex-col h-full w-full align-middle">
			{homePageContext.appState === "address_input" && <AppTitle currentTime={homePageContext.currentTime} />}
			{homePageContext.appState === "address_input" && <AddressForm />}
			{homePageContext.appState === "loading_weather" && <LoadingPage />}
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
