import { useEffect } from "react"
import AppTitle from "./app_title/AppTitle"
import { useHomePageContext } from "./state/StateContext"
import { DateTime } from "luxon"
import AppFooter from "./app_footer/AppFooter"
import { HomePageStateContextProvider } from "./state/HomePageStateContextProvider"
import AddressForm from "./address_form/AddressForm"

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
		<div>
			<AppTitle currentTime={homePageContext.currentTime} />
			<AddressForm />
			<AppFooter />
		</div>
	)
}

export const Home = () => (
	<HomePageStateContextProvider>
		<HomePage />
	</HomePageStateContextProvider>
)
