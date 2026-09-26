# Company Portal — MERN Stack (Employee / Admin Directory)

A full-stack company webpage built with MongoDB, Express, React, and Node,
covering: **Home**, **Registration form**, and **Login**, plus the
role-based directory rule from the brief:

> - If an **employee** logs in, the page authenticates them and shows all **admin** details.
> - If an **admin** logs in, the page authenticates them and shows all **employee** details.

```
mern-company-portal/
├── backend/          Express API + MongoDB (Mongoose) + JWT auth
│   ├── models/User.js        fullName, email, password, role, employeeId, department, designation, phone
│   ├── routes/auth.js        register / login / me
│   ├── routes/users.js       GET /directory — the role-swap logic lives here
│   ├── middleware/auth.js
│   ├── server.js
│   └── .env.example
└── frontend/         React app (Vite)
    └── src/
        ├── pages/     Home, Login, Register, Dashboard
        ├── components/Navbar.jsx, ProtectedRoute.jsx
        └── api.js
```

## How the role rule is enforced

Registration asks the user to pick **Employee** or **Admin** and stores that
on their account. On login, the JWT includes the user's role. The
`GET /api/users/directory` route (protected by the JWT) reads the caller's
role from the token and flips it server-side:

```js
// backend/routes/users.js
const targetRole = viewerRole === "employee" ? "admin" : "employee";
const records = await User.find({ role: targetRole }).select("-password");
```

So an employee's dashboard calls this endpoint and always gets back the
admin roster, and vice versa — the swap happens on the server, not just in
the UI, so it can't be bypassed by editing the frontend.

## 1. Prerequisites

- Node.js 18+ and npm
- MongoDB running locally, or a free MongoDB Atlas cluster

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/company_portal_db
JWT_SECRET=some_long_random_string
PORT=5000
```

Run it:

```bash
npm run dev      # nodemon, auto-restarts
# or
npm start
```

Check it: `curl http://localhost:5000/api/health`

## 3. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the printed URL (usually `http://localhost:5174`). The dev server
proxies `/api/...` to `http://localhost:5000`.

## 4. Try it out

1. Go to **Registration**, create one account with role **Admin** (fill in
   department/designation/phone/ID).
2. Register a second account with role **Employee**.
3. Log in as the **Employee** → the Dashboard shows the Admin directory.
4. Log out, log in as the **Admin** → the Dashboard shows the Employee
   directory.

## 5. API reference

| Method | Route                  | Body / Auth                                        | Notes                                   |
|--------|------------------------|-----------------------------------------------------|------------------------------------------|
| GET    | `/api/health`          | –                                                   | Health check                             |
| POST   | `/api/auth/register`   | `fullName, email, password, confirmPassword, role, employeeId, department, designation, phone` | `role` must be `"employee"` or `"admin"` |
| POST   | `/api/auth/login`      | `email, password`                                  | Returns `{ token, user }`                |
| GET    | `/api/auth/me`         | Header `Authorization: Bearer <token>`             | Returns the logged-in user                |
| GET    | `/api/users/directory` | Header `Authorization: Bearer <token>`             | Returns the **opposite role's** roster    |

Passwords are hashed with `bcryptjs`; plaintext passwords are never stored.

## 6. Next steps

- Add more fields to `User` (e.g. profile photo, office location) — update
  the model, the register form, and the directory table together.
- Add an admin-only "edit employee" action by adding a second protected
  route that checks `req.user.role === "admin"` before allowing writes.
- For production, build the frontend (`npm run build` → `frontend/dist`)
  and serve it from Express, or deploy frontend/backend separately.
