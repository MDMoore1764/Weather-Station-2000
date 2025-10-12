import type { TCoordinates } from "../../WeatherClient.types"

export type TBenchmarkResult = {
	benchmarks: TBenchmark[]
}

export type TBenchmark = {
	id: string
}

export type TUSCensusGeocodeResponse = {
	result: TUSCensusGeocodeResult
}

export type TUSCensusGeocodeResult = {
	addressMatches: TUSCensusGeocodeAddress[]
}

export type TUSCensusGeocodeAddress = {
	coordinates: TCoordinates
}

export type TNWSLocationResponse = {
	properties: TNWSFeature
}

export type TNWSFeature = {
	forecast: string
	cwa: string
}

export type TNWSForecastResponse = {
	geometry: TNWSForecastGeometry
	properties: TNWSForecastProperties
}

export type TNWSForecastGeometry = {
	type: string
	coordinates: number[]
}

export type TNWSForecastProperties = {
	units: string | null
	forecastGenerator: string | null
	generatedAt: string
	updateTime: string
	validTimes: string
	periods: TNWSPeriod[]
}

export type TNWSPeriod = {
	number: number
	name?: string
	startTime?: string
	endTime?: string
	isDaytime: boolean
	temperature: number
	temperatureUnit?: string
	temperatureTrend?: string
	probabilityOfPrecipitation?: TNWSProbabilityOfPrecipitation
	windSpeed?: string
	windDirection?: string
	icon?: string
	shortForecast?: string
	detailedForecast?: string
}

export type TNWSProbabilityOfPrecipitation = {
	unitCode: string
	value: number
}

export type TNWSAlertResponse = {
	title: string
	updated: string
	features: TNWSAlertFeature[]
}

export type TNWSAlertFeature = {
	type: string
	properties: TNWSAlertProperties
}

export type TNWSAlertProperties = {
	atId?: string // corresponds to @id
	atType?: string // corresponds to @type
	id?: string
	areaDesc?: string
	affectedZones?: string[]
	sent?: string
	effective?: string
	onset?: string
	expires?: string
	ends?: string
	status?: string
	messageType?: string
	category?: string
	severity?: string
	certainty?: string
	urgency?: string
	event?: string
	sender?: string
	senderName?: string
	headline?: string
	description?: string
	instruction?: string
	response?: string
	scope?: string
	code?: string
	language?: string
	web?: string
}

export type TGeocoderErrorResponse = {
	errors: string[]
}
