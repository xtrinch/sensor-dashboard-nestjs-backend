FROM node:alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn run build
RUN yarn run typeorm-prod migration:run

CMD [ "yarn", "run", "start" ]