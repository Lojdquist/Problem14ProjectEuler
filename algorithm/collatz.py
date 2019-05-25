#problem 14 project euler
import time
from collatzSeqString import genCollatzString
hasDict={}

def collatz(current, steps, seq):
    current = int(current)
    seq.append(current)
    if current == 1 or current in hasDict:
        if current in hasDict:
            addSequence(seq, hasDict[current])
            return steps + hasDict[current]
        else:
            addSequence(seq, 0)
            return steps
    elif current % 2 == 0:
        return collatz(current/2, steps + 1, seq)
    else:
        return collatz(current*3 + 1, steps + 1, seq)

def addSequence(seq, steps):
    steps = steps
    for i in range(len(seq) - 1, 0, -1):
        hasDict[seq[i]] = steps
        steps += 1

maxSteps = 0
maxIndex = 0
start=time.time()

for i in range(1, 1000000, 1):
    c = collatz(i, 0, [])
    if c > maxSteps:
        maxIndex = i
        maxSteps=c

elapsed = (time.time() - start)
print("Max value is ", maxSteps, " optimized took", elapsed, "seconds to execute. Value that generated sequence: ", maxIndex)
print(genCollatzString(maxIndex))

