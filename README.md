# vn-lms-ui

Frontend application for the internal Learning Management System (LMS).

This repository contains the standalone frontend used to implement authentication,
invite management, and learning platform user interfaces.

## Contents

- Overview
- Tech Stack
- Getting Started
- Routes
- Project Structure
- Environment Variables
- Scripts
- Roadmap

## Overview

This repository provides the frontend foundation for the LMS platform, including:

- Routing shell
- Authentication context placeholder
- Invite management UI (placeholder)
- Accept invite UI (placeholder)
- Login UI (placeholder)

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_ORG/vn-lms-ui.git
cd vn-lms-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

### 4. Run the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Routes (Sprint 1)

| Route | Description |
| --- | --- |
| `/login` | Login page (placeholder) |
| `/admin/invites` | Invite management page (placeholder) |
| `/accept-invite` | Accept invite page (placeholder) |

## Project Structure

```text
src/
  app/
    auth/
    errors/
    routes/
    ui/
  pages/
  components/
  styles/
```

## Environment Variables

Defined in `.env.example`:

```text
VITE_API_BASE_URL
VITE_PORT
```

## Scripts

Run development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```
