from sympy import sympify, lambdify, symbols

x = symbols('x')

def bisection_method(f, a, b):
    a = float(a)
    b = float(b)
    expr = sympify(f)
    fexpr = lambdify(x, expr) 
    c = (a+b)/2
    while ((b-a) >= 0.01):
        c = (a+b)/2
        if (fexpr(c) == 0.0):
            break
        if (fexpr(c)*fexpr(a) < 0):
            b = c
        else:
            a = c     
    return {
        "Metrics": {
        "approx-value: ": c, "error (%): " : 0
    }, 
        "guesses": []
    }

def newton_rhapson_method():
    return "newton_rhapson_method"