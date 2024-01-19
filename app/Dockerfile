FROM node

WORKDIR /app

COPY ./package.json /app/package.json

COPY ./package-lock.json /app/package-lock.json

RUN npm install

COPY ./public /app/public

COPY ./src /app/src

COPY ./.env /app/.env

CMD ["npm", "start"]
