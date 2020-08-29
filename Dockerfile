FROM node:alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./

# do not exit if this returns error as it will upon first build
RUN yarn run typeorm-prod migration:run; exit 0

CMD [ "yarn", "run", "start" ]