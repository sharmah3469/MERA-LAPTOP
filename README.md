# NAMI - Social Media Platform

NAMI is a localized, mobile-first social media platform built for the Indian market.

## Technology Stack

- **Frontend**: React, Vite, TypeScript, Vanilla CSS
- **Backend**: Node.js, Express, TypeScript, MongoDB
- **Infrastructure**: Docker, Kubernetes, AWS S3 (MinIO for local), Redis

## Getting Started

### Prerequisites

- Node.js v18+
- Docker & Docker Compose

### Local Development

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   cd NAMI
   # Install backend deps
   cd server/backend && npm install
   # Install frontend deps
   cd ../../client/frontend && npm install
   ```
3. **Setup Environment**
   ```bash
   cp config/.env.example server/backend/.env
   cp config/.env.example client/frontend/.env
   ```
4. **Start Infrastructure**
   ```bash
   cd infra/docker
   docker-compose up -d
   ```
5. **Run Application**
   ```bash
   # In root directory
   ./scripts/start-local.sh
   ```

## Directories

- `client/frontend`: React SPA
- `server/backend`: Express API
- `infra`: Infrastructure configurations (Docker, K8s, Terraform)
- `scripts`: Utility scripts
