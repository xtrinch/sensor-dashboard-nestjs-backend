FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run typeorm-prod migration:run

CMD [ "npm", "run", "start" ]