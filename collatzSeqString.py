def genCollatzString(current):
    current = int(current)
    if current == 1: 
        return '1'
    elif current % 2 == 0:
        return str(current) + ' -> ' + genCollatzString(current/2)
    else:
        return str(current) + ' -> ' + genCollatzString(current*3 + 1)