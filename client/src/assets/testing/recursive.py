x = 0

def recursive():
    global x
    if x < 11:
        x += 1
    else:
        return
    
    recursive()


recursive()

print(x)
