"""
Manual tests, output needs to be observed
"""
import time
from utils import Sensor
from mocks import GPIO


if __name__ == '__main__':
    s = Sensor(GPIO, 0, 1, poll_interval=1, threshold=0.02)
    while True:
        print(f"distance is : {s.get_distance()}")
        print(s.get_range_status())
        time.sleep(1)
