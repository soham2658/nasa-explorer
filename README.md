# NASA Explorer

A full-stack web application using **React**, **Node.js**, and **Express** that displays data from NASA's Open APIs. Explore astronomy images, asteroid data, and more — visualized creatively for space enthusiasts!

---

## Live Application

[Deployed App on Vercel](https://nasa-explorer-zeta-six.vercel.app/)

---

## GitHub Repository

[nasa-explorer GitHub Repo](https://github.com/soham2658/nasa-explorer)

---

## Project Structure

nasa-explorer/
├── backend/ # Node.js + Express server for NASA API
├── frontend/ # React frontend with routing, components
└── README.md # Project documentation

---

## Features

- Astronomy Picture of the Day (APOD)
- Asteroid Info from NASA NEO API
- Chatbot assistant
- Clean UI with Bootstrap
- Responsive layout
- NASA news (static fallback + dynamic fetch)
- Vercel + Render deployment
- 
---

## Technologies Used

### Frontend:
- React
- Bootstrap 5
- Axios
- React Router

### Backend:
- Node.js
- Express

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/soham2658/nasa-explorer.git
Backend Setup

cd backend
npm install
# Create .env file with your NASA API key
echo "NASA_API_KEY=your_api_key_here" > .env
npm start
Runs on: http://localhost:5000

Frontend Setup
cd ../frontend
npm install
npm start
Runs on: http://localhost:3000

Environment Variables
backend/.env
NASA_API_KEY=your_api_key_here
Deployment Links
Frontend: Vercel

Backend: Render

