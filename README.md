# The Scrap Pit

Demo website for a fictional combat sports gym — a Garfish Digital design showcase.

**Stack:** Vite · React 19 · TypeScript · react-router · plain CSS

```sh
npm install
npm run dev       # http://localhost:3000
npm run build     # production build -> dist/
npm run preview   # preview dist/ on :3000
npm run lint      # oxlint
```

Routes: `/`, `/training`, `/fighters`, `/about`, `/contact`. Deployed to Netlify; `public/_redirects` routes deep links to `index.html`.

The contact form is demo-only: it validates locally and shows an on-page confirmation without sending anything. Business details, fighters, and statistics are fictional.

See `PLAN.md` for the rebuild roadmap and decision log.
