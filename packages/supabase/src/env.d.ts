/// <reference types="vite/client" />

// Narrow the env typing for DX within this package
interface ImportMetaEnv {
	readonly VITE_SUPABASE_URL: string
	readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}


