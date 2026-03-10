from algorithms import square_root

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

class Model(BaseModel):
    algorithm: str

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/run")
async def run(model : Model):
    selectedalgorithm = model.algorithm
    if (selectedalgorithm == "Heron's method"):
        return {
            "algorithm": selectedalgorithm,    
            "result": square_root.herons(70)
        }
    if (selectedalgorithm == "Bakhshali method"):
        return {
            "algorithm": selectedalgorithm,   
            "result" : square_root.bakhshali(70)
        }