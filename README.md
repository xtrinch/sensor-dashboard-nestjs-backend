# Sensor dashboard backend

## Description

Simple NestJS backend for a dashboard displaying graphs of environmental sensor data.

How this works? First you need to create yourself a user. Then you create a sensor entry in the database via the API with your user token, which creates the sensor authentication token (`accessToken` field of the sensor entry). With the sensor authentication token you program your sensor board to make api calls to import measurements. One board can have multiple sensors, so you can import multiple measurements at a time.

See also [frontend](https://github.com/xtrinch/sensor-dashboard-react-frontend) and [sensor board code](https://github.com/xtrinch/sensor-dashboard-ESP32-BME680-reader), or [see it live](http://iotfreezer.com) with some sensor data from my living room.

## Installation

```bash
$ yarn install
$ cp .env.example .env
$ cp .env.test.example .env.test
```
Fill out database credentials in newly created .env files.

For detailed API documentation (swagger docs) see `http://localhost:3000/swagger`.

## Endpoints

 Endpoint               | Method | Auth?               | Query params                                 | Description
 ---------------------- | ------ | ------------------- | -------------------------------------------- | ------------------------------------------------
 `/sensors`             | GET    | No                  |                                              | List all sensor boards
 `/sensors/my`          | GET    | Yes - User token    |                                              | List all sensors for user
 `/sensors`             | POST   | Yes - User token    |                                              | Create a sensor for user
 `/measurements`        | GET    | No                  | createdAtRange, measurementTypes, sensorIds  | List all measurements
 `/measurements`        | POST   | Yes - Sensor token  |                                              | Post one measurement for a sensor board
 `/measurements/multi`  | POST   | Yes - Sensor token  |                                              | Post multiple measurements for a sensor board
 `/measurements/display`| POST   | Yes - Display token |                                              | Get latest measurements configured for a display
 `/displays/my`         | GET    | Yes - User token    |                                              | List all displays for user
 `/displays`            | POST   | Yes - User token    |                                              | Create a display entry
 `/forwarders/my`       | GET    | Yes - User token    |                                              | List all forwarders for user
 `/forwarders`          | POST   | Yes - User token    |                                              | Create a forwarder entry

## MQTT

You can also post measurement data (multiple only) via MQTT by publishing to the following topic:
`/measurements/multi/${your_jwt}`	

Example command:
`mosquitto_pub -L  'mqtts://iotfreezer.com:8883/measurements/multi/05ba4e87-e61e-4041-bbe5-35333ca4c2bc' -m '{\"measurements\":[{\"measurement\":14,\"measurementType\": \"temperature\"}]}' --cafile .\test.cer`
## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Migrations

Generate migrations:
```bash
$ yarn run typeorm migration:generate -n SampleMigrationName
```

Revert last migration:
```bash
$ yarn run typeorm migration:revert
```

Migrations are run automagically upon server start.

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Production setup
 
```bash
# spin up postgres, node and test container
$ docker-compose up -d

# backup database in production
$ docker exec -t postgres pg_dump --no-owner -U postgres sensor-dashboard > ../sensor-dashboard-database-backups/backup
```

## Restore from dump on windows

Data only restore, migration inserts will fail but the rest should succeed.

```bash
$ pg_restore --host "localhost" --port "5433" --username "postgres" --dbname "sensor-dashboard" --verbose --schema "public" "C:\Users\xtrinch\Downloads\backup-production-21-12-2020.dump"
```
