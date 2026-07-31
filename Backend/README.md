# Knit API

## Run locally

1. Copy `.env.example` to `.env`, then set a MongoDB Atlas connection string and a long random `JWT_SECRET`.
2. Run `npm install`, `npm run seed`, and `npm run dev` from this folder.
3. Add `VITE_API_URL=http://localhost:5000/api` to `Frontend/.env.local`.

## API

- `POST /api/auth/register` — name, email, password
- `POST /api/auth/login` — email, password
- `GET /api/auth/me` — logged-in user
- `GET /api/products` and `GET /api/products/:id`
- `GET /api/orders` and `POST /api/orders` — authenticated orders

`npm run seed` imports the existing Knit catalogue into MongoDB using the product IDs already used by the storefront. This lets the server independently validate all checkout prices and product sizes.
