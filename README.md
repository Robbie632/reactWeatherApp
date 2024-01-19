Hand-activated weath app

## Hardware 

run code on raspberry pi (zer0 and above with desktop raspberry OS) connected to internet with ultrasonic sensor attached to GPIO pins and HDMI output to screen

## setup
create .env file in root app/ and added following variables

```shell
REACT_APP_LATITUDE_1=<latitude of location 1>
REACT_APP_LONGITUDE_1=<longitude of location 1>
REACT_APP_LATITUDE_2=<latitude of location 2>
REACT_APP_LONGITUDE_2=<longitude of location 2>
```

fill out app/config.json  

## Running with docker

### Using docker compose
```
docker compose up
```

## Using dockerfiles

### react service

```
docker build -t dashboard:latest .
```
```
docker run -p 3000:3000 --volume <absolute path to repo>/reactWeatherApp/app/src:/app/src dashboard:latest 
```
App should now hot reload upon changes to code because volume is mapped and nodemon is used in dev script, please bear in mind that you still need to refresh the browser

To stop container get ID of running container using
```
docker ps
```
Then look up ID of running container and run
```
docker stop <container id>
```


### python service

```
docker build -t sensor:latest .
```
```
docker run -p 8000:8000 --volume <absolute path to repo>/reactWeatherApp/sensors/src:/src sensor:latest 
```
App should now hot reload upon changes to code because volume is mapped and nodemon is used in dev script, please bear in mind that you still need to refresh the browser

To stop container get ID of running container using
```
docker ps
```
Then look up ID of running container and run
```
docker stop <container id>
```
## running on host

### Python
* code in sensors/
* cd sensors
* mkdir .venv
* create virtual env with python3 -m venv .venv 
* source .venv/bin/activate
* pip install -r requirements.txt
* python manual_tests.py to manually test sensor
* python tests.py to run automated unit tests
* python server.py to set up REST api that reports if sensor in range or not and distance at endpoint ip:port/sensor

### React app
* code in app/
* cd app
* run npm install to install dependencies
* first start flask server (see above)
* run npm start to start web app

