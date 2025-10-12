import type { TAlert } from "../../WeatherClient.types"
import type { TNWSAlertResponse } from "./LocalWeatherService.types"

export function mapAlertsResponse(alerts: TNWSAlertResponse | null): TAlert[] {
	if (alerts == null) {
		return []
	}

	const mappedAlerts: TAlert[] = []

	for (const feature of alerts.features) {
		const affectedAreas = feature.properties.areaDesc
			?.split(";")
			.map((s) => s?.trim())
			.filter((s) => !!s)

		const mappedAlert = {
			affectedAreas,
			...feature.properties
		} as TAlert

		mappedAlerts.push(mappedAlert)
	}

	return mappedAlerts
}
