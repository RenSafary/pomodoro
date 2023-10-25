import time
now = time.time()
while True:
    if time.time() - now > 10.0:
        now = time.time()
        print("10 seconds")