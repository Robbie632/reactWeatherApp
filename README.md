Hand-activated weath app

## Hardware 

run code on raspberry pi (zer0 and above with desktop raspberry OS) connected to internet with ultrasonic sensor attached to GPIO pins and HDMI output to screen

## Python
* code in sensors/
* cd sensors
* mkdir .venv
* create virtual env with python3 -m venv .venv 
* source .venv/bin/activate
* pip install -r requirements.txt
* python manual_tests.py to manually test sensor
* python tests.py to run automated unit tests
* python server.py to set up REST api that reports if sensor in range or not and distance at endpoint ip:port/sensor


## React app
* code in app/
* cd app
* run npm install to install dependencies
* first start flask server (see above)
* run npm start to start web app

