import { queryOptions } from "@tanstack/react-query"
import type { TGeolocationFormState, TLocationFormState } from "../../pages/home/home.types"
import { USAAddressParser } from "../../utilities/USAAddressParser"
import { LocalWeatherService } from "./weather_services/LocalWeatherService/LocalWeatherService"
import type { IWeatherService } from "./weather_services/WeatherServices.types"

const forecastService: IWeatherService = new LocalWeatherService()

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
		return await forecastService.fetchForecastByCoordinate({
			x: query.longitude,
			y: query.latitude
		})
	}

	if (typeof query == "string") {
		const addressParser = new USAAddressParser(query)

		return await forecastService.fetchForecastByAddress({
			city: addressParser.city || null,
			postalCode: addressParser.zipCode || null,
			state: addressParser.state || null,
			streetName: addressParser.streetName || null,
			streetNumber: addressParser.streetNumber || null
		})
	}

	return await forecastService.fetchForecastByAddress(query)
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
