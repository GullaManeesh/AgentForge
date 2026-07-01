from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pipeline import run_research_pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend is running"}


@app.post("/research")
def research(data: dict):

    topic = data["topic"]

    result = run_research_pipeline(topic)

    return {
        "search_results": result["search_results"],
        "scraped_content": result["scraped_content"],
        "report": result["report"],
        "critique": result["critique"]
    }