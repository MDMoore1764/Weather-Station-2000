import * as yup from "yup"

// const streetNumberSchema = yup
// 	.number()
// 	.typeError("Street number must be a valid number")
// 	.positive("Street number must be positive")
// 	.integer("Street number must be a whole number")
// 	.required("Street number is required")

const streetNameSchema = yup
	.string()
	.trim()
	.min(2, "Street name must be at least 2 characters")
	.max(100, "Street name must be less than 100 characters")
	.matches(/^[a-zA-Z0-9\s\-'.]+$/, "Street name contains invalid characters")
	.required("Street name is required")

const citySchema = yup
	.string()
	.trim()
	.min(2, "City name must be at least 2 characters")
	.max(50, "City name must be less than 50 characters")
	.matches(/^[a-zA-Z\s\-'.]+$/, "City name can only contain letters, spaces, hyphens, and apostrophes")
	.required("City is required")

const stateSchema = yup
	.string()
	.trim()
	.min(2, "State must be at least 2 characters")
	.max(20, "State name is too long")
	.matches(/^[a-zA-Z\s]+$/, "State can only contain letters and spaces")
	.required("State is required")

const zipCodeSchema = yup
	.string()
	.trim()
	.matches(/^\d{5}(-\d{4})?$/, "ZIP code must be in format 12345 or 12345-6789")
	.required("ZIP code is required")

const quickSearchSchema = yup
	.string()
	.trim()
	.nullable()
	.min(2, "Location must be at least 2 characters")
	.max(100, "Location is too long")
	.required("Please enter a location")

export const weatherFormValidationPath = "multi-validate"
export const weatherFormValidationSchema = yup
	.object()
	.shape({
		// Quick search field
		quickSearch: yup.string().trim(),

		// Address form fields
		addressForm: yup.object().shape({
			streetNumber: yup.string().trim(),
			streetName: yup.string().trim(),
			city: yup.string().trim(),
			state: yup.string().trim(),
			postalCode: yup.string().trim()
		})
	})
	.test(
		"at-least-one-valid-option",
		"Please provide either a quick search location or complete address information",
		function (values) {
			const { quickSearch, addressForm } = values
			const { streetName, city, state, postalCode } = addressForm || {}
			//First, try and validate the quick search.
			try {
				quickSearchSchema.validateSync(quickSearch)
				return true
			} catch {
				//Do nothing
			}

			//Try validate the street number, name, and zipcode option.
			try {
				// streetNumberSchema.validateSync(Number(streetNumber))
				streetNameSchema.validateSync(streetName)
				zipCodeSchema.validateSync(postalCode)
				return true
			} catch {
				//Do nothing
			}

			//Try validate the street number, name, city, and state option.
			try {
				// streetNumberSchema.validateSync(Number(streetNumber))
				streetNameSchema.validateSync(streetName)
				citySchema.validateSync(city)
				stateSchema.validateSync(state)
				return true
			} catch {
				//Do nothing
			}

			// If none of the valid combinations are provided, return a validation error.
			return this.createError({
				path: weatherFormValidationPath,
				message:
					"Please provide one of the following: 1) Quick search location, 2) Street number + street name + ZIP code, or 3) Street number + street name + city + state"
			})
		}
	)
