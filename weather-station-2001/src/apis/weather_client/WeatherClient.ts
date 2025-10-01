import { queryOptions } from "@tanstack/react-query"
import type { TWeatherQuery } from "./WeatherClient.types"

const baseURL = import.meta.env.VITE_FORECAST_API_URL
const apiVersion = import.meta.env.VITE_FORECAST_API_VERSION

export function fetchForecastQueryOptions(query: TWeatherQuery) {
	//Do it this way so that TanStack's query caching will work on new objects, so long as they share the same lat and lon
	if ("latitude" in query && "longitude" in query) {
		return queryOptions({
			enabled: false,
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

	return queryOptions({
		enabled: false,
		queryKey: ["forecast", query.streetNumber, query.streetName, query.state, query.city, query.postalCode] as [
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

function handleErrorResponse(response: Response) {
	throw new Error(`System Malfunction Code ${response.status}: ${response.statusText}`)
}
