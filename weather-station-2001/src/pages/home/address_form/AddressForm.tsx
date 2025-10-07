import React, { useCallback } from "react"
import { useHomePageContext, type TSection } from "../state/StateContext"
import { weatherFormValidationPath, weatherFormValidationSchema } from "./AddressForm.validation"
import type { ValidationError } from "yup"

type TProps = {
	loading: boolean
}

function AddressForm(props: TProps) {
	const homePageStateContext = useHomePageContext()

	const handleSubmit = useCallback(
		(e?: React.FormEvent<HTMLFormElement>) => {
			e?.preventDefault()

			//Validate form:

			homePageStateContext.dispatch({ action: "setValidationError", payload: null })

			try {
				weatherFormValidationSchema.validateSync(
					{
						addressForm: homePageStateContext.formState.address,
						quickSearch: homePageStateContext.formState.oneLineAddress
					},
					{ abortEarly: false }
				)
			} catch (err) {
				const error = (err as ValidationError).inner.find((e) => e.path === weatherFormValidationPath)?.message
				if (error) {
					homePageStateContext.dispatch({ action: "setValidationError", payload: error })
					return
				}
			}

			homePageStateContext.dispatch({
				action: "setSubmissionState",
				payload:
					homePageStateContext.formState.geolocation ||
					homePageStateContext.formState.oneLineAddress ||
					homePageStateContext.formState.address
			})
		},
		[homePageStateContext]
	)

	const handleSubmitOnEnterKeydownEvent = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				handleSubmit()
			}
		},
		[handleSubmit]
	)

	const handleMoveNextKeydownEvent = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" || event.key === "Tab") {
			//focus next
		}
	}, [])

	const setOneLineAddress = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			homePageStateContext.dispatch({ action: "setOneLineAddress", payload: event.target.value })
		},
		[homePageStateContext]
	)

	const clearAddressForm = useCallback(() => {
		homePageStateContext.dispatch({ action: "clearAddressForm" })
	}, [homePageStateContext])

	const setActiveSection = useCallback(
		(section: TSection) => {
			homePageStateContext.dispatch({ action: "activeSection", payload: section })
		},
		[homePageStateContext]
	)

	return (
		<form onSubmit={handleSubmit} className="w-full" autoComplete="on">
			<div className="max-w-2xl mx-auto mb-8">
				<div className="bg-gray-900 p-6 rounded-lg border-4 border-cyan-400 shadow-lg shadow-cyan-400/50">
					{/* Quick Location Input */}
					<div className="mb-6">
						<div
							className={`block text-cyan-300 text-sm font-bold mb-2 uppercase tracking-wider ${
								homePageStateContext.activeSection === "onelineaddress" ? "animate-bounce" : ""
							}`}
						>
							Quick Search
						</div>
						<input
							autoComplete="one-line-address"
							type="text"
							value={homePageStateContext.formState.oneLineAddress ?? ""}
							onInput={setOneLineAddress}
							placeholder="Enter Your Address • Test Your Luck • Are you up for the challenge?"
							className="w-full px-3 py-2 bg-black border-2 border-green-400 text-green-300 font-mono focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-cyan-400/50"
							onKeyDown={handleSubmitOnEnterKeydownEvent}
							onFocus={() => setActiveSection("onelineaddress")}
							onBlur={() => setActiveSection(null)}
						/>
					</div>

					<div className="text-center mb-6">
						<div className="text-purple-400 font-bold uppercase tracking-widest text-sm">- OR -</div>
					</div>

					<div
						className={`block text-yellow-300 text-sm font-bold mb-2 uppercase tracking-wider ${
							homePageStateContext.activeSection === "address" ? "animate-bounce" : ""
						}`}
					>
						Enter Full Address
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						{/* <div>
							<div className="block text-pink-300 text-xs font-bold mb-1 uppercase tracking-wider">Street Number</div>
							<input
								name="address-line1"
								autoComplete="address-line1"
								type="text"
								value={homePageStateContext.formState.address?.streetNumber ?? ""}
								onInput={(e) =>
									homePageStateContext.dispatch({ action: "updateStreetNumber", payload: e.target.value })
								}
								placeholder="123"
								className="w-full px-2 py-2 bg-black border-2 border-pink-400 text-pink-300 font-mono text-sm focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-pink-400/50"
								onKeyDown={handleMoveNextKeydownEvent}
								onFocus={() => setActiveSection("address")}
								onBlur={() => setActiveSection(null)}
							/>
						</div> */}

						<div>
							<div className="block text-pink-300 text-xs font-bold mb-1 uppercase tracking-wider">Street</div>
							<input
								type="text"
								name="address-line1"
								autoComplete="address-line1"
								value={homePageStateContext.formState.address?.streetName ?? ""}
								onInput={(e) => homePageStateContext.dispatch({ action: "updateStreetName", payload: e.target.value })}
								placeholder="Main Street"
								className="w-full px-2 py-2 bg-black border-2 border-pink-400 text-pink-300 font-mono text-sm focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-pink-400/50"
								onKeyDown={handleMoveNextKeydownEvent}
								onFocus={() => setActiveSection("address")}
								onBlur={() => setActiveSection(null)}
							/>
						</div>

						<div>
							<div className="block text-yellow-300 text-xs font-bold mb-1 uppercase tracking-wider">City</div>
							<input
								type="text"
								name="address-level2"
								autoComplete="address-level2"
								value={homePageStateContext.formState.address?.city ?? ""}
								onInput={(e) => homePageStateContext.dispatch({ action: "updateCity", payload: e.target.value })}
								placeholder="San Francisco"
								className="w-full px-2 py-2 bg-black border-2 border-purple-400 text-purple-300 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-purple-400/50"
								onKeyDown={handleMoveNextKeydownEvent}
								onFocus={() => setActiveSection("address")}
								onBlur={() => setActiveSection(null)}
							/>
						</div>

						<div>
							<div className="block text-purple-300 text-xs font-bold mb-1 uppercase tracking-wider">State</div>
							<input
								type="text"
								name="address-level1"
								autoComplete="address-level1"
								value={homePageStateContext.formState.address?.state ?? ""}
								onInput={(e) => homePageStateContext.dispatch({ action: "updateState", payload: e.target.value })}
								placeholder="CA"
								className="w-full px-2 py-2 bg-black border-2 border-purple-400 text-purple-300 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-purple-400/50"
								onKeyDown={handleMoveNextKeydownEvent}
								onFocus={() => setActiveSection("address")}
								onBlur={() => setActiveSection(null)}
							/>
						</div>

						<div>
							<div className="block text-cyan-300 text-xs font-bold mb-1 uppercase tracking-wider">ZIP Code</div>
							<input
								type="text"
								name="postal-code"
								autoComplete="postal-code"
								value={homePageStateContext.formState.address?.postalCode ?? ""}
								onInput={(e) => homePageStateContext.dispatch({ action: "updatePostalCode", payload: e.target.value })}
								placeholder="94102"
								className="w-full px-2 py-2 bg-black border-2 border-cyan-400 text-cyan-300 font-mono text-sm focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-cyan-400/50"
								onKeyDown={handleMoveNextKeydownEvent}
								onFocus={() => setActiveSection("address")}
								onBlur={() => setActiveSection(null)}
							/>
						</div>
					</div>

					<div className="flex space-x-4">
						<button
							type="submit"
							disabled={homePageStateContext.appState === "loading_weather"}
							className="transition:200ms flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 uppercase tracking-wider border-2 border-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/50 disabled:opacity-50"
						>
							{props.loading ? "SCANNING..." : "GET WEATHER"}
						</button>
						<button
							type="button"
							onClick={getCurrentLocation}
							disabled={homePageStateContext.appState === "loading_weather"}
							className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-2 px-4 uppercase tracking-wider border-2 border-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/50"
						>
							GPS
						</button>
						<button
							type="button"
							onClick={clearAddressForm}
							className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-2 px-4 uppercase tracking-wider border-2 border-white hover:from-orange-600 hover:to-red-600 duration-300 shadow-lg shadow-red-500/50"
						>
							CLEAR
						</button>
					</div>
				</div>
			</div>
		</form>
	)
}

export default AddressForm

const getCurrentLocation = async () => {
	if (navigator.geolocation) {
		return await new Promise<GeolocationPosition>((res, rej) => {
			navigator.geolocation.getCurrentPosition(res, rej)
		})
	}

	return null
}
