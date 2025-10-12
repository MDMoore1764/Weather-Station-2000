import type { TAddress, TForecast, TCoordinates } from "../WeatherClient.types"
import type { IWeatherService } from "./WeatherServices.types"

export class RemoteWeatherService implements IWeatherService {
	async fetchForecastByAddress(address: TAddress): Promise<TForecast | null> {
		const pathParts: string[] = []

		if (address.streetNumber) {
			pathParts.push(`structureNumber=${encodeURIComponent(address.streetNumber)}`)
		}

		if (address.streetName) {
			pathParts.push(`streetName=${encodeURIComponent(address.streetName)}`)
		}

		if (address.state) {
			pathParts.push(`state=${encodeURIComponent(address.state)}`)
		}

		if (address.city) {
			pathParts.push(`city=${encodeURIComponent(address.city)}`)
		}

		if (address.postalCode) {
			pathParts.push(`postalCode=${encodeURIComponent(address.postalCode)}`)
		}

		const path = `forecast/${import.meta.env.VITE_FORECAST_API_VERSION}/ByAddress?${pathParts.join("&")}`

		const url = new URL(path, import.meta.env.VITE_FORECAST_API_URL)

		const response = await fetch(url)

		if (response.ok) {
			return (await response.json()) as TForecast
		}

		await handleErrorResponse(response)
		return null
	}

	async fetchForecastByCoordinate(coordinates: TCoordinates): Promise<TForecast | null> {
		const url = new URL(
			`forecast/${import.meta.env.VITE_FORECAST_API_VERSION}/ByCoordinates?x=${coordinates.x}&y=${coordinates.y}`,
			import.meta.env.VITE_FORECAST_API_URL
		)

		const response = await fetch(url)

		if (response.ok) {
			return (await response.json()) as TForecast
		}

		await handleErrorResponse(response)
		return null
	}
}

export async function handleErrorResponse(response: Response): Promise<never> {
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
