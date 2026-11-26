# 3A's Kitchen

Online ordering system for 3A's Kitchen (customer, admin and rider sides).

## Setup (every member, after cloning your fork)

1. **Database** - start MySQL (XAMPP), then import `database/kitchen_3as.sql` in phpMyAdmin.
   It creates the `kitchen_3as` database, all tables and a default admin account.
2. **Environment** - copy `.env.example` to `.env` and fill it in (DB login, Gmail app password for OTP).
3. **Backend**
   ```
   cd backend
   npm install
   node app.js         
   ```
4. **Frontend** 
   ```
   cd frontend
   npm install
   npm run dev         
   ```

## How the project is put together

* `backend/routes/*.js` are mounted automatically (see `backend/app.js`).
* `frontend/src/pages/*.jsx` are routed automatically (see `frontend/src/App.jsx`).
* So a fork only shows the features that have been merged into it, and adding a
  feature never means editing `app.js` or `App.jsx`.
* Email OTP runs inside Vite's dev server (`frontend/vite.config.js`), so it only
  works with `npm run dev`, not with a production build.
