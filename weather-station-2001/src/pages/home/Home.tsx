import { useEffect } from "react"
import AppTitle from "./app_title/AppTitle"
import { useHomePageContext } from "./state/StateContext"
import { DateTime } from "luxon"
import AppFooter from "./app_footer/AppFooter"
import { HomePageStateContextProvider } from "./state/HomePageStateContextProvider"
import AddressForm from "./address_form/AddressForm"
import LoadingPage from "./loading_page/LoadingPage"

function HomePage() {
	const homePageContext = useHomePageContext()

	useEffect(() => {
		const timer = setInterval(() => {
			homePageContext.dispatch({
				action: "currentTime",
				payload: DateTime.now()
			})
		}, 1000)
		return () => clearInterval(timer)
	}, [homePageContext])

	return (
		<div className="flex flex-col h-full w-full align-middle">
			<AppTitle currentTime={homePageContext.currentTime} />
			{homePageContext.appState === "address_input" && <AddressForm />}
			{homePageContext.appState === "loading_weather" && <LoadingPage />}
			<AppFooter />
		</div>
	)
}

export const Home = () => (
	<HomePageStateContextProvider>
		<HomePage />
	</HomePageStateContextProvider>
)
