#problem 14 project euler
import time
from collatzSeqString import genCollatzString

def collatzBrute(current, steps):
    current = int(current)
    if current == 1: 
        return steps
    elif current % 2 == 0:
        return collatzBrute(current/2, steps + 1)
    else:
        return collatzBrute(current*3 + 1, steps + 1)


start=time.time()
maxSteps=0
maxIndex=0
for i in range(1, 1000000, 1):
    c = collatzBrute(i, 0)
    if c > maxSteps:
        maxIndex=i
        maxSteps=c

elapsed = (time.time() - start)
print("Max value is ", maxSteps, " optimized took", elapsed, "seconds to execute. Value that generated sequence: ", maxIndex)
print(genCollatzString(maxIndex))
