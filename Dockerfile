FROM node:20.11.1-alpine3.19

RUN npm install -g http-server

RUN mkdir app

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

CMD [ "http-server", "dist"]