FROM node:alpine

RUN apk update && \
    apk add postgresql-client

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn run build

# do not exit if this returns error as it will upon first build
RUN yarn run typeorm-prod migration:run; exit 0

CMD [ "yarn", "run", "start" ]