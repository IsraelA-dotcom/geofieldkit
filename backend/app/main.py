from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import samples
from app.core.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GeoFieldKit API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://geofieldkit.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(samples.router, prefix="/api/samples", tags=["samples"])

@app.get("/")
def root():
    return {"message": "GeoFieldKit API v1.0", "status": "operational"}
