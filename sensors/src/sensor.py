# Libraries
import time
import RPi.GPIO as GPIO
from utils import Sensor

if __name__ == '__main__':
    GPIO_ECHO = 14
    GPIO_TRIGGER = 15

    s = Sensor(GPIO, GPIO_TRIGGER, GPIO_ECHO, poll_interval=1, threshold=10)
    while True:
        distance = s.get_distance()
        in_range = s.get_range_status()
        print(f"distance: {distance}")
        print(f"in range: {in_range}")
        time.sleep(0.2)
