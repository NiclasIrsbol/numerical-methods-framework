def herons(s, iter=10):
    if (s<0):
        return "Number cannot be negative"
    else:
        guess = s/2
        for _ in range(iter):
            newx = 1/2*(guess+s/guess)
            guess = newx
    return guess

def bakhshali(s, iter=10):
    if (s<0):
        return "Number cannot be negative"
    else:
        guess = s/2
        for _ in range(iter):
            a_0 = (s-guess*guess)/(2*guess)
            x1 = guess+a_0
            x2 = x1-(a_0*a_0)/(2*x1)
            guess = x2
    return guess