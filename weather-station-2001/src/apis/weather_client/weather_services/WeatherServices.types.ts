import type { TAddress, TCoordinates, TForecast } from "../WeatherClient.types"

export interface IWeatherService {
	fetchForecastByAddress(address: TAddress): Promise<TForecast | null>
	fetchForecastByCoordinate(coordinates: TCoordinates): Promise<TForecast | null>
}
