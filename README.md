# 🚀 smolURL

A simple URL shortener application built with **React**, **tRPC**, **Express**, and **Prisma**. Users can quickly shorten URLs and share them, and the server handles redirects from short URLs to the original URLs.

---

## ✨ Features

- Shorten long URLs with a single click
- Copy short URLs to clipboard
- Type-safe API communication with **tRPC**
- Persistent storage using **Prisma** ORM and **MySQL** database
- Redirect short URLs to original URLs

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Heroicons, Vite
- **Backend:** Node.js, Express, tRPC
- **Database:** MySQL (via Prisma)
- **ORM:** Prisma
- **API:** tRPC (type-safe)

---

## 🔗 How TRPC Works in This Project

- **Backend:** tRPC defines procedures (`createShortUrl` and `getShortUrl`) in `server/src/routers/urlRouter.ts`. These handle URL shortening and retrieval from the database.
- **Frontend:** The TRPC client in `client/src/trpc.ts` communicates with the backend procedures in a **type-safe** way. This ensures that any mismatch between frontend and backend is caught at compile-time.
- TRPC eliminates the need for REST endpoints and separate API type definitions, making the code simpler and safer.

---

## 🖥️ Usage

- Open the frontend URL in your browser.

- Enter a URL in the input box and click Shorten.

- It will generate a short URL and display it.

- Copy the generated short URL using the copy button.

- Visit the short URL in your browser to be redirected to the original URL.

---

## 🔑 How Short URLs Are Generated

When a user submits a URL to be shortened:

1. The backend generates a random 6-character alphanumeric string:

```ts
shortUrl = Math.random().toString(36).substring(2, 8);
```

2. Explanation of the code:

- Math.random() generates a decimal between 0 and 1.

- .toString(36) converts it to a base-36 string (numbers 0–9 and letters a–z).

- .substring(2, 8) extracts 6 characters, skipping the "0.".

3. The backend ensures the string is unique by checking the database.

4. The new short URL is saved with the original URL in the database.

Example: `https://www.google.com → http://localhost:3000/abcsed`

---

## 📝 Notes

- tRPC enables type-safe API communication between frontend and backend, reducing runtime errors.

- Prisma is used as the ORM.

- Express Redirects: Short URLs accessed via browser are handled through Express GET routes to redirect to the original URL.

---
