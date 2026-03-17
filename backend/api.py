from algorithms import square_root, roots, linear_eq, diff_eq, integrals

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

class Model(BaseModel):
    algorithm: str
    params: dict

ALGORITHMS = {
    "Heron's method": square_root.herons,
    "Bakhshali method": square_root.bakhshali,
    "Bisection method": roots.bisection_method,
    "Newton Rhapson method": roots.newton_rhapson_method,
    "Secant method": roots.secant_method,
    "Inverse method": linear_eq.inverse_method,
    "Eulers method": diff_eq.eulers,
    "Simpson method": integrals.simpsons_method,
    "Trapezoidal method": integrals.trapezoidal,
    "Midpoint method": integrals.midpoint
}

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

@app.post("/run")
async def run(model : Model):
    algorithm = ALGORITHMS.get(model.algorithm)
    params = model.params
    result = algorithm(**params)
    return result