/// <reference types="vite/client" />

// Vite environment variables
interface ImportMetaEnv {
	readonly VITE_SUPABASE_URL: string
	readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

// Node.js environment variables (for build processes)
declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_ANON_KEY: string
  }
}


