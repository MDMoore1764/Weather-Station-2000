import { queryOptions } from "@tanstack/react-query"
import type { TGeolocationFormState, TLocationFormState } from "../../pages/home/home.types"
import { USAAddressParser } from "../../utilities/USAAddressParser"

const baseURL = import.meta.env.VITE_FORECAST_API_URL
const apiVersion = import.meta.env.VITE_FORECAST_API_VERSION

export function fetchForecastQueryOptions(query: TLocationFormState | TGeolocationFormState | string | null) {
	if (query == null) {
		return queryOptions({
			enabled: true,
			networkMode: "always",
			queryKey: ["forecast"],
			queryFn: undefined
		})
	}

	if (typeof query === "object" && "latitude" in query && "longitude" in query) {
		return queryOptions({
			enabled: true,
			networkMode: "always",
			queryKey: ["forecast", query.longitude, query.latitude] as [string, number, number],
			queryFn: async (values) => {
				const [endpoint, longitude, latitude] = values.queryKey

				const url = new URL(`${endpoint}/${apiVersion}/ByCoordinates?x=${longitude}&y=${latitude}`, baseURL)

				const response = await fetch(url)

				if (response.ok) {
					return await response.json()
				}

				handleErrorResponse(response)
			}
		})
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

	return queryOptions({
		enabled: true,
		queryKey: ["forecast", streetNumber, streetName, state, city, postalCode] as [
			string,
			string | undefined,
			string | undefined,
			string | undefined,
			string | undefined,
			string | undefined
		],
		queryFn: async (values) => {
			const [endpoint, streetNumber, streetName, state, city, postalCode] = values.queryKey

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

			const path = `${endpoint}/${apiVersion}/ByAddress?${pathParts.join("&")}`

			const url = new URL(path, baseURL)

			const response = await fetch(url)

			if (response.ok) {
				return await response.json()
			}

			handleErrorResponse(response)
		}
	})
}

export async function handleErrorResponse(response: Response) {
	let problemDetails: TProblemDetails | null = null
	try {
		problemDetails = (await response.json()) as TProblemDetails
	} catch {
		//Empty
	}

	if (problemDetails != null) {
		throw new Error(`${problemDetails.title}(CODE ${response.status}): ${problemDetails.detail}`)
	}

	throw new Error(`System Malfunction ${response.status}: ${response.statusText}`)
}
