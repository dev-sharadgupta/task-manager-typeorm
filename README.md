# 🗂️ Task Manager App (Full Stack)

A full-stack **Task Management Application** built with modern technologies:

* ⚛️ **Frontend**: React 19 + TypeScript + Vite + Tailwind + Redux Toolkit
* 🚀 **Backend**: Node.js + Express + TypeORM + MySQL
* 🔐 Authentication using JWT
* 📦 Clean architecture with scalable structure

---

## 🚀 Project Overview

This project demonstrates a **production-style full-stack setup** including:

* Authentication system (JWT-based)
* Scalable frontend architecture (Redux Toolkit + RTK Query)
* Backend API with TypeORM and MySQL
* Form validation using Zod
* Modern UI using Tailwind + shadcn/ui

---

## 📁 Project Structure

```bash
task-manager-app/
│
├── task-manager-frontend/   # React + Vite + TypeScript
├── task-manager-backend/    # Node + Express + TypeORM
│
└── README.md
```

---

# ⚛️ Frontend Setup

## 🛠 Tech Stack

* React 19 + TypeScript
* Vite
* Tailwind CSS
* Redux Toolkit + RTK Query
* React Router DOM
* Axios
* Zod
* shadcn/ui
* lucide-react (icons)

---

## ⚙️ Installation & Setup

### 1. Create Project

```bash
npm create vite@latest task-manager-frontend -- --template react-ts
cd task-manager-frontend
npm install
```

---

### 2. Install Tailwind

```bash
npm install tailwindcss @tailwindcss/vite
```

#### Update `vite.config.ts`

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

#### Update `src/index.css`

```css
@import "tailwindcss";
```

---

### 3. Install Dependencies

```bash
npm install react-router-dom
npm install lucide-react
npm install @reduxjs/toolkit react-redux
npm install axios
npm install zod
```

---

### 4. Setup shadcn/ui

#### Add path alias

**tsconfig.json**

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  }
}
```

**tsconfig.app.json**

```json
"compilerOptions": {
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

```bash
npx shadcn@latest init
```

---

### 5. Run Frontend

```bash
npm run dev
```

---

## 📌 Frontend Architecture Highlights

* Redux Store → `src/_redux/store.ts`
* Typed Hooks → `src/_redux/hooks.ts`
* API Layer → `src/_api/index.ts`
* Auth Slice → `src/pages/auth/slice/index.tsx`

---

# 🚀 Backend Setup

## 🛠 Tech Stack

* Node.js + Express
* TypeScript
* TypeORM
* MySQL
* JWT Authentication
* Zod (validation)

---

## ⚙️ Installation & Setup

### 1. Initialize Project

```bash
npm init -y
```

---

### 2. Install Dependencies

```bash
npm install express cors bcrypt jsonwebtoken dotenv mysql2 reflect-metadata
npm install -D typescript ts-node-dev typeorm-ts-node-commonjs
npm install -D @types/express @types/bcrypt @types/jsonwebtoken @types/cors @types/cookie-parser
```

---

### 3. Setup TypeScript

```bash
npx tsc --init
```

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

---

### 4. Environment Variables

Create `.env`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=task_manager

JWT_SECRET=supersecretjwtkey
CLIENT_URL=http://localhost:5173
```

---

### 5. Run Backend

```bash
npm run dev
```

---

## 📌 Backend Features

* TypeORM DataSource setup
* MySQL integration
* JWT-based authentication
* Middleware (CORS, cookies, JSON parsing)
* Scalable structure for APIs

---

## 🔐 Authentication Flow

1. User logs in via frontend
2. Backend validates credentials
3. JWT token is generated
4. Token stored (cookies/localStorage)
5. Protected routes verified
6. User accesses dashboard

---

## ▶️ Running Full Project

### Start Backend

```bash
cd task-manager-backend
npm run dev
```

### Start Frontend

```bash
cd task-manager-frontend
npm run dev
```

---

## 📈 Future Improvements

* Add task CRUD APIs
* Role-based access control
* Refresh tokens
* Deployment (Docker + CI/CD)
* Testing (Jest / React Testing Library)

---

## 🎯 Key Learning Outcomes

* Full-stack architecture design
* State management with Redux Toolkit
* API integration with RTK Query
* Authentication flow (JWT)
* Database handling with TypeORM
* Clean and scalable project structure

---

## 📄 License

This project is open-source and free to use for learning purposes.

---

## 🙌 Author

Built as a learning + portfolio project to demonstrate real-world full-stack development skills.
