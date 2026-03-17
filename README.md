# Numerical Methods Framework

A full-stack educational app for experimenting with core numerical algorithms.

- Backend: FastAPI + SymPy
- Frontend: React + TypeScript + Vite
- Focus: compute approximations and visualize method behavior

## Implemented Algorithms

### 1) Square Root Approximation
- Heron's method
- Bakhshali method

What it does:
- Approximates sqrt(s) iteratively from an initial guess.
- Returns approximation, relative error, and iteration guesses.

### 2) Root Finding for f(x) = 0
- Bisection method
- Newton Rhapson method
- Secant method

What it does:
- Solves nonlinear equations by iterative refinement.
- Returns approximation and all intermediate guesses.

### 3) Systems of Linear Equations
- Inverse method

What it does:
- Parses matrix A and vector B from text input.
- Solves x = A^-1 B (via pseudo-inverse in current implementation).
- Returns the solution vector as `Matrix`.

### 4) Differential Equations
- Euler method

What it does:
- Approximates y(x) for first-order ODEs from initial condition.
- Returns approximation and generated points for plotting.

### 5) Numerical Integration
- Simpson method
- Trapezoidal method
- Midpoint method

What it does:
- Approximates integral from a to b for a given integrand f(x).
- Returns the approximate integral value.

## Visualizations

The frontend currently includes dedicated visual modes:

- Iteration line chart:
  - Used for Heron and Bakhshali (`guesses`).
- Function graph with approximated root marker:
  - Used for Bisection, Newton Rhapson, Secant.
- Euler path chart:
  - Used for Euler method (`points`).
- Cumulative integral curve:
  - Used for Simpson, Trapezoidal, Midpoint.
  - Plots numerical accumulation I(x) = integral from a to x.
- Inverse solution bar chart:
  - Used for Inverse method.
  - Plots each solved variable value in the returned solution vector.

## Project Structure

- `backend/api.py`: FastAPI app and algorithm routing
- `backend/algorithms/`: numerical method implementations
- `frontend/src/App.tsx`: algorithm selection, parameter form, result rendering
- `frontend/src/components/`: plotting components

## Run Locally

## Prerequisites
- Python 3.10+
- Node.js 18+

## 1) Backend setup (FastAPI)

From project root:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn sympy
uvicorn api:app --reload --port 8000
```

Backend API will be available at:
- `http://localhost:8000`

## 2) Frontend setup (Vite)

From project root:

```bash
cd frontend
npm install
npm run dev
```

Frontend app will be available at:
- `http://localhost:5173`

## API Usage

Endpoint:
- `POST /run`

Payload:

```json
{
  "algorithm": "Bisection method",
  "params": {
    "f": "x^3 - x - 2",
    "a": 1,
    "b": 2
  }
}
```

> [!NOTE]
> Params, and thus the payload, vary depending on the selected algorithm. 

Notes:
- `algorithm` must match one of the exact names in the UI dropdown.
- `params` keys must match the selected algorithm signature.

## Parameter Reference

### Heron's / Bakhshali
- `s`: number to square-root
- `iter`: iteration count

### Bisection
- `f`: function string in `x`
- `a`, `b`: interval bounds

### Newton Rhapson
- `f`: function string in `x`
- `iter`: iteration count
- `x_0`: initial guess

### Secant
- `f`: function string in `x`
- `iter`: iteration count
- `x_0`, `x_1`: initial guesses

### Inverse
- `A`: matrix-like text, row-separated by `;`
- `B`: vector-like text

Example:
- `A = "[2x+3y;5x+1y]"`
- `B = "[50;40]"`

### Euler
- `f`: function string in `(x, y)`
- `x0`, `y0`: initial point
- `h`: step size
- `yx`: target x value

### Simpson / Trapezoidal / Midpoint
- `f`: integrand string in `x`
- `a`, `b`: limits
- `n`: subdivision count

## Useful Function Input Tips

- Use `x^2 + 2*x + 1` style expressions.
- Multiplication should be explicit: `2*x` (not `2x` in function fields).
- For trig/log/exp, use SymPy-friendly names (`sin(x)`, `log(x)`, `exp(x)`).

## Known Limitations

- Simpson's rule normally requires even `n`; this is not strictly validated yet.
- Integration methods currently cast `a`, `b`, `n` to integers in backend implementation.
- Error metrics are not yet implemented consistently for all algorithms.
- API request model is generic (`params: dict`) instead of per-algorithm typed schemas.

## Suggested Next Improvements

- Add consistent error/residual metrics for every method.
- Validate method-specific input constraints at API level.
- Add per-method convergence plots and error-vs-step plots.
- Add backend tests for each algorithm and edge case.

## License

No license file is currently defined in this repository.
