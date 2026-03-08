def herons(s, iter=10):
    if (s<0):
        return "Number cannot be negative"
    else:
        guess = s/2
        for _ in range(iter):
            newx = 1/2*(guess+s/guess)
            guess = newx
    return guess