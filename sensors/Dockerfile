FROM python:3

WORKDIR /sensors

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./src src

WORKDIR /sensors/src

CMD [ "python", "server.py" ]