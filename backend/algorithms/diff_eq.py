from sympy import *

x, y = symbols('x y')

def eulers(f, x0, y0, h, yx):
    try:
        fexpr = lambdify((x, y), f)
        x_n = float(x0)
        y_n = float(y0)
        step_size = float(h)
        target_x = float(yx)
        approxs = []
        points = [{"x": x_n, "y": y_n}]
        while x_n < target_x:
            y_n = y_n + step_size * fexpr(x_n, y_n)
            x_n = x_n + step_size
            approxs.append(y_n)
            points.append({"x": x_n, "y": y_n})
    except:
        return {"Error": "An error has occurred"}
    return {
        "Metrics": {
            "approx-value ": y_n
        }, 
        "guesses": approxs,
        "points": points
    }