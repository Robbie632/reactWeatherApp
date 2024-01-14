"""
utils for communicating with sensor hardware
"""
import time
from threading import Thread
from queue import Queue, Full, Empty


class Sensor:
    """
    class for communicating with sensor, runs thread that polls sensor 
    sets self.distance as current distance
    which can be accessed with self.get_distance
    """

    def __init__(self, gpio_module, trigger_pin, echo_pin, poll_interval=1, threshold=30):
        self.distance = 0
        self.range_status = Queue(3)
        self.gpio_module = gpio_module
        self.trigger_pin = trigger_pin
        self.echo_pin = echo_pin
        self.poll_interval = poll_interval
        self.threshold = threshold
        self.prev_in_range = False
        Thread(target = self.sensor_loop, args=(self.gpio_module, 
                                                self.trigger_pin, 
                                                self.echo_pin)).start()
        
    def into_range(self, distance: float) -> int:
        """
        returns string encoding whether sensor has gone into range, 
        gone out of range, or stayed in same state
        value: current measured distance

        return out: 1:  moved into range
                    -1: moved out of range
                    0:  stayed the same
        """
        in_range =  distance < self.threshold
        out = 0
        if not self.prev_in_range and in_range:
            out = 1
        if self.prev_in_range and not in_range:
            out =  -1
        self.prev_in_range = in_range
        return out

    def get_distance(self):
        """
        getter
        """
        return self.distance
    
    def get_range_status(self):
        try:
          in_range = self.range_status.get(block=True, timeout=3)
        except Empty:
            return 0
        return in_range

    def sensor_loop(self, gpio_module, trigger_pin, echo_pin, poll_interval=1):
        """
        gpio_module:  RPi.GPIO module
        distance: shared variable, distance measured, to be updated when calculated
        trigger_pin: pin of trigger
        echo_pin: pin of echo
        poll_interval: seconds, amount of time to pause between getting distance in while loop
        """
        # GPIO Mode (BOARD / BCM)
        gpio_module.setmode(gpio_module.BCM)
        # set GPIO direction (IN / OUT)
        gpio_module.setup(trigger_pin, gpio_module.OUT)
        gpio_module.setup(echo_pin, gpio_module.IN)

        while True:

            # set Trigger to HIGH
            gpio_module.output(trigger_pin, True)

            # set Trigger after 0.01ms to LOW
            time.sleep(0.00001)
            gpio_module.output(trigger_pin, False)

            start_time = time.time()
            stop_time = time.time()
            # save StartTime
            while gpio_module.input(echo_pin) == 0:
                start_time = time.time()

            # save time of arrival
            while gpio_module.input(echo_pin) == 1:

                stop_time = time.time()

            # time difference between start and arrival
            time_elapsed = stop_time - start_time
            # multiply with the sonic speed (34300 cm/s)
            # and divide by 2, because there and back
            self.distance = (time_elapsed * 34300) / 2
            in_range = self.into_range(self.distance)
            try:
              self.range_status.put(in_range, block=False)
            except Full:
                pass
            time.sleep(poll_interval)


class RangeFinder:
    """
    class that holds logic for checking if in range
    """
    def __init__(self, threshold: float) -> None:
        """
        threshold: distance of range, less than is deemed in range
          more than is demmed out of range
        """
        self.threshold = threshold
        self.prev_in_range = False

    def into_range(self, distance: float) -> int:
        """
        returns string encoding whether sensor has gone into range, 
        gone out of range, or stayed in same state
        value: current measured distance

        return out: 1:  moved into range
                    -1: moved out of range
                    0:  stayed the same
        """
        in_range =  distance < self.threshold
        out = 0
        if not self.prev_in_range and in_range:
            out = 1
        if self.prev_in_range and not in_range:
            out =  -1
        self.prev_in_range = in_range
        return out
        