# StudioSpace

StudioSpace is a responsive marketplace frontend for discovering and booking independent creative studios. It is built with Next.js App Router, React, TypeScript, Tailwind CSS, Lucide icons, and Sonner notifications.

**Live site:** Not deployed yet.

## Features

- Browse photo studios, film stages, podcast rooms, music suites, and art workshops.
- Search and filter studio listings, inspect studio details, amenities, host information, and reviews.
- Request bookings by date and time, and manage pending reservations.
- Register, sign in, and manage studio listings with create, edit, and delete screens.
- Switch between light and dark themes; layouts adapt for mobile, tablet, and desktop.
- Branded loading, API error, and empty states with toast feedback for actions.

## Local setup

1. Install Node.js 20 or newer.
2. Install dependencies with `npm install`.
3. Create `.env.local` and set `NEXT_PUBLIC_API_URL=http://localhost:5000` (or your deployed API origin).
4. Start the frontend with `npm run dev`, then open `http://localhost:3000`.
5. Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` to validate the client.

The API server is a separate project and is not included in this repository. The frontend sends cookie-enabled requests to the configured API origin. The server must support credentialed CORS and issue/clear its authentication cookie on sign-in/sign-out.

## API integration

The client expects JSON endpoints for `POST /users`, `POST /auth/login`, `POST /auth/logout`, `GET /studios`, `GET /studios/:id`, `POST /studios`, `PUT /studios/:id`, `DELETE /studios/:id`, `GET /my-listings`, `GET /my-bookings`, `POST /bookings`, `PATCH /bookings/:id`, and `POST /newsletter`.

The API must enforce authorization on private reads and mutations; client-supplied email and host fields are display/form data, not proof of identity. Booking overlap prevention must be enforced by the server. Google sign-in can be enabled by setting `NEXT_PUBLIC_GOOGLE_AUTH_URL` to the server's OAuth start URL.

## Examiner access

- **Test credentials:** No examiner account is seeded in this client repository. Create an account on `/register` after connecting the API, or use credentials supplied by the API/deployment owner.
- **Client repository:** `Najmul-420/studio-space-client`
- **Live URL:** Not available until the application is deployed.
