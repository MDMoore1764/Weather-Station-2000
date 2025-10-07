export type TForecast = {
	generatedAt: string
	lastUpdated: string
	affectedLocations: Array<AffectedLocation[]>
	forecasts: TForecastElement[]
	alerts: TAlert[]
}

export type TCoordinates = {
	x: number
	y: number
}

export type TAlert = {
	affectedAreas: string[]
	sent: string //iso date time
	effective: string //iso date time
	onset: string //iso date time
	expires: string //iso date time
	ends: string //iso date time
	category: string
	severity: string
	certainty: string
	urgency: string
	event: string
	senderName: string
	headline: string
	description: string
	instruction: null | string
	code: string
}

export type TForecastElement = {
	startTime: string // iso date time
	endTime: string // iso date time
	isDaytime: boolean
	temperature: number
	temperatureUnit: "F" | "C"
	temperatureTrend: string
	probabilityOfPrecipitation: string
	windSpeed: string
	windDirection: string
	icon: string
	shortForecast: string
	detailedForecast: string
}
