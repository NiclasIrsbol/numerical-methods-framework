from sympy import *
import math

xsymbol = symbols('x')

def simpsons_method(f, a, b, n):
    a = int(a)
    b = int(b)
    n = int(n)
    fexpr = lambdify(xsymbol, f)
    h=(b-a)/n
    k=0.0
    x=a + h
    for _ in range(1,math.floor((n/2)) + 1):
        k += 4*fexpr(x)
        x += 2*h
    x = a + 2*h
    for _ in range(1,math.floor((n/2))):
        k += 2*fexpr(x)
        x += 2*h
    return { "Metrics": {
            "approx-value ": (h/3)*(fexpr(a)+fexpr(b)+k)
        } } 

def trapezoidal(f, a, b, n):
    a = int(a)
    b = int(b)
    n = int(n)
    fexpr = lambdify(xsymbol, f)
    h = float(b - a) / n
    s = 0.0
    s += fexpr(a)/2.0
    for i in range(1, n):
        s += fexpr(a + i*h)
    s += fexpr(b)/2.0
    return { "Metrics": {
            "approx-value ": s*h
        } } 

def midpoint(f, a, b, n):
    a = int(a)
    b = int(b)
    n = int(n)
    fexpr = lambdify(xsymbol, f)
    h = float(b-a)/n
    result = 0
    for i in range(n):
        result += fexpr((a + h/ 2.0) + i*h)
    result *= h
    return { "Metrics": {
            "approx-value ": result
        } } 

