# Table Tennis Manager

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Render](https://img.shields.io/badge/Render-000000?logo=render&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-00E599?logo=neon&logoColor=black)

Full-stack application for managing table tennis players and matches.

## Overview

This project was developed as a school assignment. It lets you manage players, track their matches and store results in a PostgreSQL database. React frontend, Express backend containerized with Docker and Prisma as the ORM layer.

## Features

- Create, read, update and delete players
- Add matches to a player (date and time, score, opponent)
- View player details and match history

## Tech stack

- **Frontend:** React
- **Backend:** Node.js, Express, Prisma
- **Database:** PostgreSQL
- **DevOps:** Docker
- **Deploy:** Render (backend), Cloudflare Pages (frontend), Neon (database)

## Installation

> **Note:** Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) to be installed and running.

1. Rename `backend/.env.example` to `backend/.env`.
2. Create a Neon database and paste both connection strings into `backend/.env`.
3. Run Docker Compose:

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Website

[Table Tennis Manager](https://table-tennis-manager-3se.pages.dev/)

> **Note:** The backend runs on a free tier and may take up to a minute to wake up after inactivity.

## Screenshots

![Player creation](https://raw.githubusercontent.com/mk-forge/table-tennis-manager/main/Screenshots/player-creation.png)
![Player list](https://raw.githubusercontent.com/mk-forge/table-tennis-manager/main/Screenshots/player-list.png)
![Player detail](https://raw.githubusercontent.com/mk-forge/table-tennis-manager/main/Screenshots/player-detail.png)
![Player matches](https://raw.githubusercontent.com/mk-forge/table-tennis-manager/main/Screenshots/player-matches.png)

## License

[MIT](LICENSE)