# Order Management — Exam Project

Full-stack customer order management system with **Angular** frontend and **Spring Boot** backend, synced via **OpenAPI/Swagger**.

## Project Structure

```
Exam/
├── backend/          # Spring Boot REST API (Java 17, SQLite)
│   ├── src/
│   ├── pom.xml
│   └── run.ps1
└── frontend/         # Angular 19 SPA
    ├── openapi/          # OpenAPI spec (synced from backend)
    ├── src/app/api/      # Auto-generated client (DO NOT EDIT)
    ├── src/app/services/ # Facade services wrapping generated API
    └── scripts/          # Sync scripts
```

## Quick Start

### 1. Start Backend (port 8080)

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Or: `.\run.ps1`

### 2. Start Frontend (port 4200)

```powershell
cd frontend
npm install
npm start
```

Open: **http://localhost:4200**

### 3. Swagger UI (test API)

Open: **http://localhost:8080/swagger-ui.html**

Raw OpenAPI JSON: **http://localhost:8080/api-docs**

## OpenAPI Sync (Backend ↔ Frontend)

When you modify backend controllers, sync the frontend automatically:

```powershell
cd frontend
npm run sync:api
```

This will:
1. Fetch the latest OpenAPI spec from `http://localhost:8080/api-docs`
2. Save it to `openapi/openapi.json` and `public/openapi/openapi.json`
3. Regenerate Angular models & services in `src/app/api/`

The facade services in `src/app/services/` wrap the generated API and stay compatible with the UI.

## API Endpoints

| Resource | Endpoint |
|----------|----------|
| Orders | `GET/POST /api/orders`, `GET/PUT/DELETE /api/orders/{id}` |
| Order Lines | `GET/POST /api/orders/{orderId}/lines`, `DELETE .../lines/{lineId}` |
| Attachments | `GET/POST /api/orders/{orderId}/attachemets`, `DELETE .../attachemets/{id}` |

## Frontend Pages

- **/** — Order list (Add, Edit, Delete)
- **/orders/new** — Create new order
- **/orders/:id** — Order details (3 sections: details, lines, attachments)
- **/api-docs** — In-app API documentation (synced with Swagger)

## Tech Stack

- **Backend:** Spring Boot 3.5, Spring Data JPA, SQLite, springdoc-openapi
- **Frontend:** Angular 19, HttpClient, ng-openapi-gen
- **Sync:** OpenAPI 3.1 spec → auto-generated TypeScript client
