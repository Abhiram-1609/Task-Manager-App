# Fast Task Manager

A modern, fast task management application built with React and Node.js.

## Features

- User authentication (register/login)
- Create, read, update, delete tasks
- Task priorities (low, medium, high)
- Task status (pending, completed)
- Modern, responsive UI
- Single-port deployment (backend + frontend)
- JWT authentication
- MongoDB database

## Quick Start

1. "Install dependencies:"
   bash
   npm install
   

2. "Start the application:"
   bash
   npm run dev
   

3. "Open your browser:"
   
   http://localhost:3000
   

## Usage

1. "Register" a new account or "login" with existing credentials
2. "Create tasks" with title, description, and priority
3. "Manage tasks" - mark as complete, reopen, or delete
4. "View all tasks" in your dashboard

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Tech Stack

- Frontend: React, React Router, CSS
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Authentication: JWT
- Styling: Custom CSS with modern design

## Project Structure

```
task-manager/
├── server.js          # Express server
├── package.json       # Backend dependencies
├── .env              # Environment variables
└── client/           # React frontend
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── TaskForm.js
    │   │   └── TaskList.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Environment Variables

Create a `.env` file in the root directory:

```
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
```

## Development

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build production frontend
- `npm start` - Start production server

The app runs on a single port (3000) serving both the API and the React frontend.
