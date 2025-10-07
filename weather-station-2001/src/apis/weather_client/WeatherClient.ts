import { queryOptions } from "@tanstack/react-query"
import type { TGeolocationFormState, TLocationFormState } from "../../pages/home/home.types"
import { USAAddressParser } from "../../utilities/USAAddressParser"
import type { TForecast } from "./WeatherClient.types"

export function fetchForecastQueryOptions(query: TLocationFormState | TGeolocationFormState | string | null) {
	return queryOptions({
		queryKey: ["forecast", query],
		enabled: query != null,
		queryFn: () => fetchForecastData(query),
		staleTime: 60 * 5 * 1000, // cache for 5 minutes
		retry: false,
		refetchInterval: 60 * 5 * 1000 // refetch every 5 minutes
	})
}

export async function fetchForecastData(query: TLocationFormState | TGeolocationFormState | string | null) {
	if (query == null) {
		throw new Error("Query is null.")
	}

	if (typeof query === "object" && "latitude" in query && "longitude" in query) {
		const url = new URL(
			`forecast/${import.meta.env.VITE_FORECAST_API_VERSION}/ByCoordinates?x=${query.longitude}&y=${query.latitude}`,
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
