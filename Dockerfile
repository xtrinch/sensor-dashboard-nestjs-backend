FROM node:alpine

RUN apk update && \
    apk add postgresql-client

RUN apk update && apk add bash

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build

CMD [ "yarn", "run", "start" ]