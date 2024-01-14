from flask import Flask, jsonify
from utils import Sensor
#import RPi.GPIO as GPIO
from mocks import GPIO

gpio_echo = 14
gpio_trigger = 15
s = Sensor(GPIO, gpio_trigger, gpio_echo, poll_interval=1, threshold=10)

app = Flask(__name__)

@app.route("/sensor", methods=["GET"])
def get_sensor():
    """
    returns distance and whether sensor in range
    """
    
    sensor_reading = {"inRange": s.get_range_status()}
    response = jsonify(sensor_reading)
    response.headers.add('Access-Control-Allow-Origin',
                         '*')
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
