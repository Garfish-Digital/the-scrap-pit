// Build-time switches.
// Set VITE_STUDIES=off (e.g. in Netlify's env for the client-facing deploy) to
// drop the /studies routes and their header links from the build.
export const SHOW_STUDIES = import.meta.env.VITE_STUDIES !== 'off'
