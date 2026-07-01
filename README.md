# AgentForge

AgentForge is a multi-agent AI research app. The React frontend accepts a topic, sends it to a FastAPI backend, and returns a generated research report with a structured critique.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: FastAPI, LangChain, Groq, Mistral AI, Tavily

## Local Setup

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Create `backend/.env` with your API keys:

```env
GROQ_API_KEY=your_key_here
MISTRAL_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

For production, set `VITE_API_URL` to your deployed backend URL.

## Deployment

- Deploy the backend as a Python web service with start command `uvicorn app:app --host 0.0.0.0 --port $PORT`.
- Deploy the frontend as a Vite static site with build command `npm run build` and output directory `dist`.
