"""
Manual tests, output needs to be observed
"""
import time
from random import random
from utils import Sensor

class GPIO:
    """dummy class for testing code"""

    def __init__(self):
        """
        set up dummy class
        """
        self.BCM=None
        self.OUT = None
        self.IN = None

    def setmode(self, a):
        """
        dummy method
        """

    def setup(self, a, b):
        """
        dummy method
        """

    def output(self, a, b):
        """
        dummy method
        """
        return int(round(random()))

    def input(self, a):
        """
        dummy method
        """

    def cleanup(self):
        """
        dummy method
        """

if __name__ == '__main__':
    s = Sensor(GPIO(), 0, 1, poll_interval=1, threshold=0.02)
    while True:
        print(f"distance is : {s.get_distance()}")
        print(s.get_range_status())
        time.sleep(1)
