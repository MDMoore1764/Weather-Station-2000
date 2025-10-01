/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_FORECAST_API_URL: string
	readonly VITE_FORECAST_API_VERSION: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
