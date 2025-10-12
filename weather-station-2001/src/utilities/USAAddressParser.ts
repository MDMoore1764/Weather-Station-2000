/**
 * Comprehensive USA Address Parser
 * Handles complex address parsing with extensive edge case coverage
 */
export class USAAddressParser {
	private rawInput: string
	private parsed: {
		streetNumber?: string
		streetName?: string
		city?: string
		state?: string
		postalCode?: string
	} = {}

	// Comprehensive state mappings
	private readonly STATE_ABBR: { [key: string]: string } = {
		ALABAMA: "AL",
		ALASKA: "AK",
		ARIZONA: "AZ",
		ARKANSAS: "AR",
		CALIFORNIA: "CA",
		COLORADO: "CO",
		CONNECTICUT: "CT",
		DELAWARE: "DE",
		FLORIDA: "FL",
		GEORGIA: "GA",
		HAWAII: "HI",
		IDAHO: "ID",
		ILLINOIS: "IL",
		INDIANA: "IN",
		IOWA: "IA",
		KANSAS: "KS",
		KENTUCKY: "KY",
		LOUISIANA: "LA",
		MAINE: "ME",
		MARYLAND: "MD",
		MASSACHUSETTS: "MA",
		MICHIGAN: "MI",
		MINNESOTA: "MN",
		MISSISSIPPI: "MS",
		MISSOURI: "MO",
		MONTANA: "MT",
		NEBRASKA: "NE",
		NEVADA: "NV",
		"NEW HAMPSHIRE": "NH",
		"NEW JERSEY": "NJ",
		"NEW MEXICO": "NM",
		"NEW YORK": "NY",
		"NORTH CAROLINA": "NC",
		"NORTH DAKOTA": "ND",
		OHIO: "OH",
		OKLAHOMA: "OK",
		OREGON: "OR",
		PENNSYLVANIA: "PA",
		"RHODE ISLAND": "RI",
		"SOUTH CAROLINA": "SC",
		"SOUTH DAKOTA": "SD",
		TENNESSEE: "TN",
		TEXAS: "TX",
		UTAH: "UT",
		VERMONT: "VT",
		VIRGINIA: "VA",
		WASHINGTON: "WA",
		"WEST VIRGINIA": "WV",
		WISCONSIN: "WI",
		WYOMING: "WY",
		"DISTRICT OF COLUMBIA": "DC",
		"PUERTO RICO": "PR",
		GUAM: "GU",
		"VIRGIN ISLANDS": "VI",
		"AMERICAN SAMOA": "AS",
		"NORTHERN MARIANA ISLANDS": "MP"
	}

	private readonly VALID_STATES = new Set([
		"AL",
		"AK",
		"AZ",
		"AR",
		"CA",
		"CO",
		"CT",
		"DE",
		"FL",
		"GA",
		"HI",
		"ID",
		"IL",
		"IN",
		"IA",
		"KS",
		"KY",
		"LA",
		"ME",
		"MD",
		"MA",
		"MI",
		"MN",
		"MS",
		"MO",
		"MT",
		"NE",
		"NV",
		"NH",
		"NJ",
		"NM",
		"NY",
		"NC",
		"ND",
		"OH",
		"OK",
		"OR",
		"PA",
		"RI",
		"SC",
		"SD",
		"TN",
		"TX",
		"UT",
		"VT",
		"VA",
		"WA",
		"WV",
		"WI",
		"WY",
		"DC",
		"PR",
		"GU",
		"VI",
		"AS",
		"MP"
	])

	// Street type abbreviations and their variations
	private readonly STREET_TYPES: { [key: string]: string[] } = {
		AVENUE: ["AVE", "AV", "AVEN", "AVENU", "AVN", "AVNUE"],
		BOULEVARD: ["BLVD", "BOUL", "BOULV", "BV"],
		CIRCLE: ["CIR", "CIRC", "CIRCL", "CRCL", "CRCLE"],
		COURT: ["CT", "CRT"],
		DRIVE: ["DR", "DRV", "DRIV"],
		EXPRESSWAY: ["EXPY", "EXP", "EXPR", "EXPRESS", "EXPW"],
		FREEWAY: ["FWY", "FREEWY", "FRWAY", "FRWY"],
		HIGHWAY: ["HWY", "HIWAY", "HIWY", "HWAY"],
		LANE: ["LN", "LA"],
		PARKWAY: ["PKWY", "PARKWY", "PKWAY", "PKY", "PRKWY"],
		PLACE: ["PL", "PLC"],
		ROAD: ["RD", "RD."],
		STREET: ["ST", "STR", "STRT", "STR.", "ST."],
		TERRACE: ["TER", "TERR", "TERRC"],
		TRAIL: ["TRL", "TRAILS", "TRLS"],
		WAY: ["WY"],
		ALLEY: ["ALY", "ALLY", "ALLEE"],
		SQUARE: ["SQ", "SQR", "SQRE", "SQU"],
		PIKE: ["PIKE", "PK"],
		RUN: ["RUN"],
		PLAZA: ["PLZ", "PLZA"],
		LOOP: ["LOOP", "LP"],
		BRIDGE: ["BRG", "BRDGE"],
		LANDING: ["LNDG", "LNDNG", "LDG"]
	}

	// Directional abbreviations
	private readonly DIRECTIONS: { [key: string]: string[] } = {
		NORTH: ["N", "NO", "NTH"],
		SOUTH: ["S", "SO", "STH"],
		EAST: ["E", "EA", "EST"],
		WEST: ["W", "WE", "WST"],
		NORTHEAST: ["NE", "NEAST"],
		NORTHWEST: ["NW", "NWEST"],
		SOUTHEAST: ["SE", "SEAST"],
		SOUTHWEST: ["SW", "SWEST"]
	}

	// Secondary unit designators
	private readonly UNIT_TYPES = [
		"APT",
		"APARTMENT",
		"UNIT",
		"SUITE",
		"STE",
		"BLDG",
		"BUILDING",
		"FLOOR",
		"FL",
		"ROOM",
		"RM",
		"DEPT",
		"DEPARTMENT",
		"#",
		"NO",
		"LOT",
		"PIER",
		"SLIP",
		"SPACE",
		"SPC",
		"STOP",
		"TRAILER",
		"TRLR"
	]

	constructor(input: string) {
		this.rawInput = input
		this.parse()
	}

	private parse(): void {
		if (!this.rawInput || this.rawInput.trim() === "") {
			return
		}

		let workingStr = this.normalize(this.rawInput)

		// Step 1: Extract and remove ZIP code
		workingStr = this.extractZipCode(workingStr)

		// Step 2: Extract and remove state
		workingStr = this.extractState(workingStr)

		// Step 3: Remove unit/apartment designators (they interfere with parsing)
		workingStr = this.removeUnitDesignators(workingStr)

		// Step 4: Parse remaining components
		this.parseStreetAndCity(workingStr)

		// Step 5: Post-processing and validation
		this.postProcess()
	}

	private normalize(input: string): string {
		// Remove extra whitespace, normalize case
		let normalized = input.trim().toUpperCase()

		// Replace multiple spaces with single space
		normalized = normalized.replace(/\s+/g, " ")

		// Normalize common separators
		normalized = normalized.replace(/[,;]+/g, ",")

		// Handle periods in abbreviations
		normalized = normalized.replace(/\./g, " ")
		normalized = normalized.replace(/\s+/g, " ")

		return normalized
	}

	private extractZipCode(input: string): string {
		// Match 5-digit or 5+4 digit ZIP codes
		const zipPatterns = [
			/\b(\d{5})-(\d{4})\b/, // 12345-6789
			/\b(\d{5})\s+(\d{4})\b/, // 12345 6789
			/\b(\d{5})\b/ // 12345
		]

		for (const pattern of zipPatterns) {
			const match = input.match(pattern)
			if (match) {
				if (match[2]) {
					this.parsed.postalCode = `${match[1]}-${match[2]}`
				} else {
					this.parsed.postalCode = match[1]
				}
				// Remove ZIP from working string
				return input.replace(pattern, "").trim()
			}
		}

		return input
	}

	private extractState(input: string): string {
		// Try to find state at the end of the string
		const tokens = input.split(/[\s,]+/).filter((t) => t.length > 0)

		// Check last few tokens for state
		for (let i = tokens.length - 1; i >= Math.max(0, tokens.length - 3); i--) {
			const token = tokens[i]

			// Check if it's a 2-letter state abbreviation
			if (this.VALID_STATES.has(token)) {
				this.parsed.state = token
				tokens.splice(i, 1)
				return tokens.join(" ")
			}

			// Check if it's a full state name (handle multi-word states)
			const possibleStates = [
				tokens.slice(i).join(" "),
				tokens.slice(Math.max(0, i - 1), i + 1).join(" "),
				tokens.slice(Math.max(0, i - 2), i + 1).join(" ")
			]

			for (const stateName of possibleStates) {
				if (this.STATE_ABBR[stateName]) {
					this.parsed.state = this.STATE_ABBR[stateName]
					const stateWords = stateName.split(" ").length
					tokens.splice(i - stateWords + 1, stateWords)
					return tokens.join(" ")
				}
			}
		}

		return input
	}

	private removeUnitDesignators(input: string): string {
		// Remove apartment/unit numbers and designators
		const unitPattern = new RegExp(`\\b(${this.UNIT_TYPES.join("|")})\\s*[\\w\\-]*\\b`, "gi")
		return input.replace(unitPattern, "").trim()
	}

	private parseStreetAndCity(input: string): void {
		const tokens = input.split(/[\s,]+/).filter((t) => t.length > 0)

		if (tokens.length === 0) return

		// Strategy: Find the boundary between street and city
		// Street typically starts with a number, city typically doesn't
		// City is usually at the end before state/zip

		const streetEndIdx = this.findStreetEndIndex(tokens)

		// Extract street components
		if (streetEndIdx >= 0) {
			const streetTokens = tokens.slice(0, streetEndIdx + 1)
			this.parseStreet(streetTokens)

			// Everything after street is city
			const cityTokens = tokens.slice(streetEndIdx + 1)
			if (cityTokens.length > 0) {
				this.parsed.city = this.cleanCity(cityTokens.join(" "))
			}
		} else {
			// No clear street found, treat everything as street
			this.parseStreet(tokens)
		}
	}

	private findStreetEndIndex(tokens: string[]): number {
		// Look for street type indicators
		for (let i = tokens.length - 1; i >= 0; i--) {
			const token = tokens[i]

			// Check if token is a street type
			if (this.isStreetType(token)) {
				return i
			}

			// Check if token is a direction following a potential street name
			if (i > 0 && this.isDirection(token)) {
				return i
			}
		}

		// If no street type found, look for numbers at the start
		// and assume street ends before the last 2-3 tokens (likely city)
		if (tokens.length > 2 && this.startsWithNumber(tokens[0])) {
			// Conservative: assume last 1-2 tokens are city
			return Math.max(1, tokens.length - 2)
		}

		return -1
	}

	private parseStreet(tokens: string[]): void {
		if (tokens.length === 0) return

		// Extract street number (may be a range or fractional)
		let numberIdx = 0
		const streetNumPattern = /^\d+/

		if (streetNumPattern.test(tokens[0])) {
			this.parsed.streetNumber = this.extractStreetNumber(tokens)
			numberIdx = 1

			// Handle fractional addresses like "123 1/2"
			if (numberIdx < tokens.length && /^\d+\/\d+$/.test(tokens[numberIdx])) {
				this.parsed.streetNumber += " " + tokens[numberIdx]
				numberIdx++
			}
		}

		// Everything else is street name
		if (numberIdx < tokens.length) {
			this.parsed.streetName = tokens.slice(numberIdx).join(" ")
			this.parsed.streetName = this.normalizeStreetName(this.parsed.streetName)
		}
	}

	private extractStreetNumber(tokens: string[]): string {
		const first = tokens[0]

		// Handle ranges like "123-125"
		if (/^\d+-\d+$/.test(first)) {
			return first
		}

		// Handle simple numbers
		const match = first.match(/^(\d+)/)
		return match ? match[1] : first
	}

	private normalizeStreetName(name: string): string {
		// Expand abbreviations for readability
		let normalized = name

		// Normalize street types
		for (const [full, abbrs] of Object.entries(this.STREET_TYPES)) {
			for (const abbr of abbrs) {
				const pattern = new RegExp(`\\b${abbr}\\b`, "i")
				if (pattern.test(normalized)) {
					// Keep abbreviated form for consistency
					normalized = normalized.replace(pattern, full)
					break
				}
			}
		}

		// Normalize directions
		for (const [full, abbrs] of Object.entries(this.DIRECTIONS)) {
			for (const abbr of abbrs) {
				const pattern = new RegExp(`\\b${abbr}\\b`, "i")
				if (pattern.test(normalized)) {
					normalized = normalized.replace(pattern, full)
					break
				}
			}
		}

		return normalized
	}

	private isStreetType(token: string): boolean {
		for (const abbrs of Object.values(this.STREET_TYPES)) {
			if (abbrs.includes(token)) return true
		}

		// Also check full names
		for (const full of Object.keys(this.STREET_TYPES)) {
			if (token === full) return true
		}

		return false
	}

	private isDirection(token: string): boolean {
		for (const abbrs of Object.values(this.DIRECTIONS)) {
			if (abbrs.includes(token)) return true
		}

		for (const full of Object.keys(this.DIRECTIONS)) {
			if (token === full) return true
		}

		return false
	}

	private startsWithNumber(token: string): boolean {
		return /^\d/.test(token)
	}

	private cleanCity(city: string): string {
		// Remove trailing commas and clean up
		return city.replace(/,+$/, "").trim()
	}

	private postProcess(): void {
		// Clean up any remaining artifacts
		if (this.parsed.city) {
			// Remove any stray state abbreviations from city
			this.parsed.city = this.parsed.city
				.replace(new RegExp(`\\b(${Array.from(this.VALID_STATES).join("|")})\\b`, "g"), "")
				.trim()

			// Remove trailing commas
			this.parsed.city = this.parsed.city.replace(/,+$/, "").trim()

			// Title case city name
			this.parsed.city = this.toTitleCase(this.parsed.city)
		}

		if (this.parsed.streetName) {
			this.parsed.streetName = this.toTitleCase(this.parsed.streetName)
		}
	}

	private toTitleCase(str: string): string {
		return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
	}

	// Public getters
	get streetNumber(): string | undefined {
		return this.parsed.streetNumber
	}

	get streetName(): string | undefined {
		return this.parsed.streetName
	}

	get city(): string | undefined {
		return this.parsed.city
	}

	get state(): string | undefined {
		return this.parsed.state
	}

	get zipCode(): string | undefined {
		return this.parsed.postalCode
	}

	// Utility getter for full parsed object
	get allComponents(): typeof this.parsed {
		return { ...this.parsed }
	}

	// Method to get formatted address
	getFormatted(): string {
		const parts: string[] = []

		if (this.parsed.streetNumber && this.parsed.streetName) {
			parts.push(`${this.parsed.streetNumber} ${this.parsed.streetName}`)
		} else if (this.parsed.streetName) {
			parts.push(this.parsed.streetName)
		}

		if (this.parsed.city) {
			parts.push(this.parsed.city)
		}

		if (this.parsed.state && this.parsed.postalCode) {
			parts.push(`${this.parsed.state} ${this.parsed.postalCode}`)
		} else if (this.parsed.state) {
			parts.push(this.parsed.state)
		} else if (this.parsed.postalCode) {
			parts.push(this.parsed.postalCode)
		}

		return parts.join(", ")
	}
}
