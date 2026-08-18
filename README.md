# Table Tennis Manager

Full-stack application for managing table tennis players and matches.

## Overview

This project was developed as a school assignment. Lets you manage players, track their matches, and store results in a SQLite database. React frontend, Express backend, Prisma as the ORM layer.

## Features

- Create, read, update, and delete players
- Add matches to a player (date and time, score, opponent)
- View player details and match history

## Tech stack

Frontend: React
Backend: Node.js, Express, Prisma
Database: SQLite

## Installation

Backend:
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm start
```

Frontend:
```bash
cd frontend
npm install
npm start
```

## Screenshots

![Player creation](./Screenshots/player-creation.png)
![Player list](./Screenshots/player-list.png)
![Player detail](./Screenshots/player-detail.png)
![Player matches](./Screenshots/player-matches.png)