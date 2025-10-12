/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_FORECAST_API_URL: string
	readonly VITE_FORECAST_API_VERSION: string
	readonly VITE_GEOCODING_BASEURI: string
	readonly VITE_GEOCODING_FORMAT: string
	readonly VITE_GEOCODING_ACCEPT: string
	readonly VITE_GEOCODING_USERAGENT: string
	readonly VITE_NWS_BASEURI: string
	readonly VITE_NWS_ACCEPT: string
	readonly VITE_NWS_USERAGENT: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
