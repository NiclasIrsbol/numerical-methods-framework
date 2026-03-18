from sympy import *
import re

def inverse_method(A,B):
    try:
        a_rows = A.strip().strip("[]").split(";")
        a_matrix = [[int(n) for n in re.findall(r"[-+]?\d+", row)] for row in a_rows if row.strip()]

        b_vector = [int(n) for n in re.findall(r"[-+]?\d+", B)]
        A_sym = Matrix(a_matrix)
        b_sym = Matrix(b_vector)
        x = []
        if A_sym.rows == A_sym.cols:
            x = A_sym.pinv() * b_sym
    except:
        return {"Error": "An error has occurred"}
    return {
        "Matrix": [float(v.evalf()) for v in x]
    }