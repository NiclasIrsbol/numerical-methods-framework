from sympy import sympify, lambdify, symbols, diff

x = symbols('x')

def bisection_method(f, a, b):
    a = float(a)
    b = float(b)
    tol = 1e-6
    max_iter = 250

    if a == b:
        return {"Error": {"error": "a and b must be different"}}

    if a > b:
        a, b = b, a

    expr = sympify(f)
    fexpr = lambdify(x, expr)

    fa = fexpr(a)
    fb = fexpr(b)

    if abs(fa) < tol:
        return {
            "Metrics": {
                "approx-value ": a,
            },
            "guesses": [a]
        }

    if abs(fb) < tol:
        return {
            "Metrics": {
                "approx-value ": b,
            },
            "guesses": [b]
        }

    if fa * fb > 0:
        return {
            "Error": {
                "error": "Root not found in interval"
            }
        }

    guesses = []
    c = (a + b) / 2

    for _ in range(max_iter):
        c = (a + b) / 2
        fc = fexpr(c)
        guesses.append(c)

        if abs(fc) < tol or (b - a) / 2 < tol:
            break

        if fa * fc < 0:
            b, fb = c, fc
        else:
            a, fa = c, fc

    return {
        "Metrics": {
        "approx-value ": c,
    },
        "guesses": guesses
    }

def newton_rhapson_method(f, iter, x_0, **kwargs):
    expr = sympify(f)
    fexpr = lambdify(x, expr)
    f_diff = diff(f, x)
    expr_diff = sympify(f_diff)
    fexpr_diff = lambdify(x, expr_diff)
    guesses = []
    x0 = float(x_0)
    for _ in range(iter):
        x1 = x0-(fexpr(x0)/fexpr_diff(x0))
        guesses.append(x1)
        x0 = x1
    return {
        "Metrics": {
            "approx-value ": x1
        },
        "guesses": guesses
    }

def secant_method(f, iter, x_0, x_1):
    x_0 = float(x_0)
    x_1 = float(x_1)
    expr = sympify(f)
    fexpr = lambdify(x, expr)
    guesses = []
    try:
        for _ in range(iter):
            x_2 = x_1 - fexpr(x_1) * (x_1 - x_0) / float(fexpr(x_1) - fexpr(x_0))
            guesses.append(x_2)
            x_0, x_1 = x_1, x_2
    except:
        return {"Error": {
            "error": "An error has occurred" 
        }}
    return {
        "Metrics": {
            "approx-value ": x_2
        },
        "guesses": guesses
    }