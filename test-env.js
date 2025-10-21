// Test script to verify environment variable handling
console.log('Testing environment variables...')

// Test if we can access the environment variables
const supabaseUrl = typeof import.meta !== 'undefined' && import.meta.env
  ? import.meta.env.VITE_SUPABASE_URL
  : process.env.VITE_SUPABASE_URL

const supabaseKey = typeof import.meta !== 'undefined' && import.meta.env
  ? import.meta.env.VITE_SUPABASE_ANON_KEY
  : process.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl ? 'Found' : 'Not found')
console.log('Supabase Key:', supabaseKey ? 'Found' : 'Not found')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Environment variables not found!')
  console.error('Please create a .env file in the root with:')
  console.error('VITE_SUPABASE_URL=your_supabase_url')
  console.error('VITE_SUPABASE_ANON_KEY=your_supabase_key')
  process.exit(1)
} else {
  console.log('✅ Environment variables found!')
}
