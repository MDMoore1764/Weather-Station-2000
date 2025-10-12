import type { TAddress } from "../../WeatherClient.types"

export class AddressValidator {
	constructor(private address: TAddress) {}

	validate() {
		if (!!this.address.streetName?.trim() && !!this.address.postalCode?.trim()) {
			return true
		}

		if (!!this.address.streetName?.trim() && !!this.address.city?.trim() && !!this.address.state?.trim()) {
			return true
		}

		return false
	}
}
