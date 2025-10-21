// Node.js process.env type definitions for supabase environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_ANON_KEY: string
  }
}


