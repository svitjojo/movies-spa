# 🎬 Movies SPA

A single-page application for managing a movie collection.  
Built with **React + Redux Toolkit + TypeScript**, packaged with **Docker** for easy deployment.

---

## 🚀 Run locally (without Docker)

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.  
   The backend API should be available at the URL specified in `.env`, for example:
   ```
   VITE_API_URL=http://localhost:8000/api/v1
   ```

---

## 🐳 Build and run with Docker

### 1. Build the Docker image

```bash
docker build -t your_dockerhub_user/movies .
```

### 2. Run the container

```bash
docker run --name movies -p 3000:3000   -e API_URL=http://localhost:8000/api/v1   your_dockerhub_user/movies
```

- `-p 3000:3000` — exposes the app on port 3000 of your host machine.
- `-e API_URL=...` — sets the backend API URL (depends on your environment).  
  Examples:
  - Local backend: `http://localhost:8000/api/v1`
  - Network backend: `http://192.168.1.44:8000/api/v1`

---

## ⚙️ Runtime configuration

When the container starts, an **entrypoint script** generates `/dist/config.json` containing runtime environment values (like `API_URL`).  
The React app automatically fetches this file on startup and uses the provided backend URL.

---

## 📑 Features

- Add, edit, and delete movies.
- View detailed information about a movie.
- Sort and search (by title, year, or actor).

---
