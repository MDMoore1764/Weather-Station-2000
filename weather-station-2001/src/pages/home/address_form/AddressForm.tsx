import React, { useCallback, useEffect } from "react"
import { useHomePageContext, type TSection } from "../state/StateContext"
import { weatherFormValidationPath, weatherFormValidationSchema } from "./AddressForm.validation"
import type { ValidationError } from "yup"
import { useMusicManager } from "../../../hooks/music-manager/useMusicManager"
import { useTheme } from "../../../themes/ThemeContext"
import { Button } from "../../../components/styled/Button"
import { Input } from "../../../components/styled/Input"

type TProps = {
	loading: boolean
}

function AddressForm(props: TProps) {
	const homePageStateContext = useHomePageContext()
	const musicManager = useMusicManager()
	const { theme } = useTheme()

	useEffect(() => {
		musicManager.changeSong(`resources/audio/BachgroundMuseik.mp3`, true)
	}, [])

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
		<form onSubmit={handleSubmit} className="w-full px-2 sm:px-4" autoComplete="on">
			<div className="max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8">
				<div
					className={`bg-${theme.colors.background} p-3 sm:p-4 md:p-6 rounded-lg border-2 sm:border-4 border-${theme.colors.cardBorder} shadow-lg shadow-${theme.colors.shadow}`}
				>
					{/* Quick Location Input */}
					<div className="mb-4 sm:mb-6">
						<Input
							autoComplete="one-line-address"
							type="text"
							value={homePageStateContext.formState.oneLineAddress ?? ""}
							onInput={setOneLineAddress}
							placeholder="Enter Your Address"
							label={homePageStateContext.activeSection === "onelineaddress" ? "Quick Search 🔍" : "Quick Search"}
							labelColor={`text-${theme.colors.text}`}
							onKeyDown={handleSubmitOnEnterKeydownEvent}
							onFocus={() => setActiveSection("onelineaddress")}
							onBlur={() => setActiveSection(null)}
						/>
					</div>

					<div className="text-center mb-4 sm:mb-6">
						<div className={`text-${theme.colors.accent} font-bold uppercase tracking-widest text-xs sm:text-sm`}>
							- OR -
						</div>
					</div>

					<div
						className={`block text-yellow-300 text-xs sm:text-sm font-bold mb-2 sm:mb-3 uppercase tracking-wider ${
							homePageStateContext.activeSection === "address" ? "animate-bounce" : ""
						}`}
					>
						Enter Full Address
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
						<div className="sm:col-span-2">
							<Input
								type="text"
								name="address-line1"
								autoComplete="address-line1"
								value={homePageStateContext.formState.address?.streetName ?? ""}
								onInput={(e) =>
									homePageStateContext.dispatch({ action: "updateStreetName", payload: e.currentTarget.value })
								}
								placeholder="Main Street"
								label="Street"
								labelColor="text-pink-300"
								onKeyDown={handleMoveNextKeydownEvent}
								onFocus={() => setActiveSection("address")}
								onBlur={() => setActiveSection(null)}
							/>
						</div>

						<div>
							<Input
								type="text"
								name="address-level2"
								autoComplete="address-level2"
								value={homePageStateContext.formState.address?.city ?? ""}
								onInput={(e) => homePageStateContext.dispatch({ action: "updateCity", payload: e.currentTarget.value })}
								placeholder="San Francisco"
								label="City"
								labelColor="text-yellow-300"
								onKeyDown={handleMoveNextKeydownEvent}
								onFocus={() => setActiveSection("address")}
								onBlur={() => setActiveSection(null)}
							/>
						</div>

						<div>
							<Input
								type="text"
								name="address-level1"
								autoComplete="address-level1"
								value={homePageStateContext.formState.address?.state ?? ""}
								onInput={(e) =>
									homePageStateContext.dispatch({ action: "updateState", payload: e.currentTarget.value })
								}
								placeholder="CA"
								label="State"
								labelColor="text-purple-300"
								onKeyDown={handleMoveNextKeydownEvent}
								onFocus={() => setActiveSection("address")}
								onBlur={() => setActiveSection(null)}
							/>
						</div>

						<div className="sm:col-span-2">
							<Input
								type="text"
								name="postal-code"
								autoComplete="postal-code"
								value={homePageStateContext.formState.address?.postalCode ?? ""}
								onInput={(e) =>
									homePageStateContext.dispatch({ action: "updatePostalCode", payload: e.currentTarget.value })
								}
								placeholder="94102"
								label="ZIP Code"
								labelColor="text-cyan-300"
								onKeyDown={handleMoveNextKeydownEvent}
								onFocus={() => setActiveSection("address")}
								onBlur={() => setActiveSection(null)}
							/>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
						<Button
							type="submit"
							variant="secondary"
							disabled={homePageStateContext.appState === "loading_weather"}
							className="flex-1"
						>
							{props.loading ? "SCANNING..." : "GET WEATHER"}
						</Button>
						<Button
							type="button"
							variant="primary"
							onClick={getCurrentLocation}
							disabled={homePageStateContext.appState === "loading_weather"}
							className="sm:w-auto"
						>
							GPS
						</Button>
						<Button
							type="button"
							variant="danger"
							onClick={clearAddressForm}
							className="sm:w-auto"
						>
							CLEAR
						</Button>
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
