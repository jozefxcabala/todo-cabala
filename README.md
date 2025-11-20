# To-Do App

A simple to-do application built with React and TypeScript, featuring a mock API server using json-server.

## Project Structure

```
todo-cabala/
├── BE/                    # Backend - Mock API server (json-server)
│   ├── db.json           # Todo database
│   └── package.json
├── FE/                    # Frontend - React application (TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── TodoForm.tsx
│   │   │   │   └── TodoForm.css
│   │   │   ├── TodoItem/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── TodoItem.tsx
│   │   │   │   ├── EditTodoItem.tsx
│   │   │   │   └── TodoItem.css
│   │   │   └── TodoList/
│   │   │       ├── index.tsx
│   │   │       ├── TodoList.tsx
│   │   │       └── TodoList.css
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   └── ...
│   ├── tsconfig.json
│   └── package.json
└── package.json           # Root package.json for running both servers
```

## Requirements

- Node.js (version 14 or higher)
- npm or yarn

## Installation

### Option 1: Install all dependencies at once (Recommended)

From the root directory:

```bash
npm install
npm run install:all
```

### Option 2: Install dependencies separately

```bash
# Install root dependencies (concurrently)
npm install

# Install BE dependencies
cd BE
npm install

# Install FE dependencies
cd ../FE
npm install
```

## Running the Application

### Quick Start (Both servers at once)

From the root directory, run:

```bash
npm start
```

This will start both the backend and frontend servers simultaneously.

### Manual Start (Separate terminals)

#### Terminal 1 - Backend Server

```bash
cd BE
npm start
```

Backend server will run on `http://localhost:3001`

#### Terminal 2 - Frontend Application

```bash
cd FE
npm start
```

Frontend application will automatically open in your browser at `http://localhost:3000`

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Todo Structure

```json
{
  "id": 1,
  "title": "Todo title",
  "description": "Todo description",
  "completed": false,
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

## Component Structure

Each component follows a clean structure:

- `index.tsx` - Simple export file
- `ComponentName.tsx` - Main component implementation
- `ComponentName.css` - Component styles

## Technologies

- **Frontend:** React 18 + TypeScript
- **Backend:** json-server
- **Styling:** CSS3 (responsive design)
- **Build Tool:** Create React App

## Available Scripts

### Root Level

- `npm install` - Install root dependencies (concurrently)
- `npm run install:all` - Install all dependencies (BE + FE)
- `npm start` - Start both backend and frontend servers simultaneously
- `npm run start:be` - Start only backend server
- `npm run start:fe` - Start only frontend server

### Backend (BE/)

- `npm start` - Start json-server on port 3001

### Frontend (FE/)

- `npm start` - Start React development server on port 3000
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (irreversible)
