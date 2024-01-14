from random import random

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
GPIO = GPIO()
