FROM node:18.8.0-alpine

#RUN npm install -g http-server#RUN npm install -g pm2

RUN mkdir app

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

CMD [ "http-server", "dist"]
#CMD [ "pm2", "serve", "dist"]
#CMD [ "pm2", "serve", "dist", "5173"]