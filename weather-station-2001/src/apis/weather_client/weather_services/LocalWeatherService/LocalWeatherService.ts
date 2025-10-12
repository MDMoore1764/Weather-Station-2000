import type { TAddress, TForecast, TCoordinates, TForecastElement } from "../../WeatherClient.types"
import type { IWeatherService } from "../WeatherServices.types"
import { AddressValidator } from "./AddressValidator"
import type {
	TBenchmarkResult,
	TNWSAlertResponse,
	TNWSForecastResponse,
	TUSCensusGeocodeResponse
} from "./LocalWeatherService.types"
import { mapAlertsResponse } from "./LocalWeatherService.utilities"

export class LocalWeatherService implements IWeatherService {
	private ADDRESS_ENDPOINT = "locations/address"
	private BENCHMARKS_ENDPOINT = "benchmarks"
	private POINTS_ENDPOINT = "points/"
	private ALERTS_ENDPOINT = "alerts/"

	async fetchForecastByAddress(address: TAddress): Promise<TForecast | null> {
		//verify address

		const isValid = new AddressValidator(address).validate()

		if (!isValid) {
			throw new Error(`The provided address is not valid: "${address.streetName}, ${address.city} ${address.state}"`)
		}

		const coordinates = await this.#getCoordinates(address)
		return await this.fetchForecastByCoordinate(coordinates)
	}

	async fetchForecastByCoordinate(coordinates: TCoordinates): Promise<TForecast | null> {
		const forecastURI = new URL(
			`${this.POINTS_ENDPOINT}${coordinates.y},${coordinates.x}`,
			import.meta.env.VITE_NWS_BASEURI
		)
		const alertsURI = new URL(
			`${this.ALERTS_ENDPOINT}?point=${coordinates.y},${coordinates.x}`,
			import.meta.env.VITE_NWS_BASEURI
		)

		const forecastRequest = fetch(forecastURI, {
			headers: {
				Accept: import.meta.env.VITE_NWS_ACCEPT,
				UserAgent: import.meta.env.VITE_NWS_USERAGENT
			}
		})

		const alertsRequest = fetch(alertsURI, {
			headers: {
				Accept: import.meta.env.VITE_NWS_ACCEPT,
				UserAgent: import.meta.env.VITE_NWS_USERAGENT
			}
		})

		const forecastResponse = await forecastRequest
		if (!forecastResponse.ok) {
			return await handleErrorResponse(forecastResponse)
		}

		const forecast = (await forecastResponse.json()) as TNWSForecastResponse

		const alertResponse = await alertsRequest
		let alerts: TNWSAlertResponse | null = null
		if (alertResponse.ok) {
			alerts = await alertResponse.json()
		}

		return {
			alerts: mapAlertsResponse(alerts),
			affectedLocations: forecast.geometry.coordinates.map((coordinateSets) =>
				coordinateSets.map((coordinates) => ({ x: coordinates[0], y: coordinates[1] }))
			),
			generatedAt: forecast.properties.generatedAt,
			lastUpdated: forecast.properties.updateTime,
			forecasts: forecast.properties.periods.map(
				(p) =>
					({
						...p,
						probabilityOfPrecipitation: `${p.probabilityOfPrecipitation?.value ?? 0}${
							p.probabilityOfPrecipitation?.unitCode ?? "F"
						}`
					} as TForecastElement)
			)
		} as TForecast
	}

	async #getCoordinates(address: TAddress) {
		const benchmarkVersion = await this.#getGeocoderLatestBenchmark()
		const url = await this.#formatAddressGeocodingRequest(address, benchmarkVersion)

		const geocodeResponse = await fetch(url, {
			headers: {
				Accept: import.meta.env.VITE_GEOCODING_ACCEPT,
				UserAgent: import.meta.env.VITE_GEOCODING_USERAGENT
			}
		})

		if (!geocodeResponse.ok) {
			return await handleErrorResponse(geocodeResponse)
		}

		const result = (await geocodeResponse.json()) as TUSCensusGeocodeResponse
		const coordinates = result.result.addressMatches.at(0)?.coordinates ?? null

		if (!coordinates) {
			throw new Error("System Malfunction: Unable to determine coordinates.")
		}

		return coordinates
	}

	async #getGeocoderLatestBenchmark() {
		const url = new URL(this.BENCHMARKS_ENDPOINT, import.meta.env.VITE_GEOCODING_BASEURI)

		const bmr = await fetch(url, {
			headers: {
				Accept: import.meta.env.VITE_GEOCODING_ACCEPT,
				UserAgent: import.meta.env.VITE_GEOCODING_USERAGENT
			}
		})

		if (!bmr.ok) {
			return await handleErrorResponse(bmr)
			throw new Error("unreachable")
		}

		const benchmarkResult = (await bmr.json()) as TBenchmarkResult
		const result = benchmarkResult.benchmarks.at(0)?.id ?? null

		if (!result) {
			throw new Error("System Malfunction: Unable to determine geocode benchmark.")
		}

		return result
	}

	async #formatAddressGeocodingRequest(address: TAddress, benchmark: string) {
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

		const path = `${this.ADDRESS_ENDPOINT}?format=${
			import.meta.env.VITE_GEOCODING_FORMAT
		}&benchmark=${benchmark}&${pathParts.join("&")}`

		const url = new URL(path, import.meta.env.VITE_GEOCODING_BASEURI)
		return url
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
