# PetLar 🐾

Sistema de adoção de animais com frontend React + Vite e backend Node/Express.

## Estrutura

```
t2/
├── frontend/   # React + Vite + Bootstrap 5
└── backend/    # Node.js + Express 5 + MongoDB
```

## Rodando o projeto

### Backend
```bash
cd backend
cp .env.example .env
# edite .env com sua MONGODB_URI
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

O frontend roda em http://localhost:5173 e proxia `/api` para http://localhost:5000.
