export type TWeatherQuery =
	| {
			streetNumber?: string
			streetName?: string
			city?: string
			state?: string
			postalCode?: string
	  }
	| {
			latitude: number
			longitude: number
	  }
