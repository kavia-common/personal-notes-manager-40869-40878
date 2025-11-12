# Ocean Notes Frontend

A Next.js UI for a personal notes manager, styled with the Ocean Professional theme.

- Top toolbar, left sidebar list, and main editor/viewer.
- Client-side CRUD against a backend at `NEXT_PUBLIC_API_BASE`, with graceful in-memory fallback when the API is unavailable.
- Responsive, accessible UI with keyboard focus styles and smooth transitions.

## Environment

Set the base URL for the backend via:

- NEXT_PUBLIC_API_BASE

If this is not set (or the backend is unreachable), the app runs fully in preview mode using an in-memory store seeded with a sample note.

## Development

- Install dependencies and run:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the app.

## Notes

- API calls are implemented in `src/lib/api.ts`. Do not hardcode endpoints; the base comes from `NEXT_PUBLIC_API_BASE`.
- The Ocean Professional theme variables are in `src/app/globals.css`.
