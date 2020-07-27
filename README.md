# Sensor dashboard backend

## Description

Simple NestJS backend for a dashboard displaying graphs of environmental sensor data.

## Installation

```bash
$ yarn install
```

## Endpoints

 Endpoint              | Method | Auth? | Description
 --------------------- | ------ | ----- | -----------
 `/sensors`            | GET    | No    | List all sensor boards
 `/measurements`       | GET    | No    | List all measurements
 `/measurements`       | POST   | Yes   | Post one measurement for a sensor board
 `/measurements/multi` | POST   | Yes   | Post multiple measurements for a sensor board

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
