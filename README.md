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

If running tests locally, make sure to add `127.0.0.1 postgrestest` to /etc/hosts.

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov

# run via docker-compose
$  docker-compose --env-file .env.test --profile testing up --exit-code-from backendtest 
```

## Production setup
 
```bash

# copy the prod env example
$ cp .prod.env.example .env
# change:
# - KOOFR_EMAIL 
# - KOOFR_PASSWORD (generate a new koofr password on their dashboard)
# - JWT_SECRET (generate random)
# - ADMIN_TOKEN (generate random)
# - GOOGLE_CLIENT_ID
# - GOOGLE_SECRET
# - TYPEORM_PASSWORD
# - PGPASSWORD

# spin up postgres, node and test container
$ docker-compose --profile run up -d

# restore database, winscp the backup into your server first
$ sudo docker inspect iotfreezer-postgres | grep "IPAddress"
# if you need to do some maintenance in the db first
$ psql -h 172.25.0.2 -p 5433 -U postgres --dbname=sensor-dashboard
$ pg_restore --host "172.24.0.3" --port "5433" --username "postgres" --dbname "sensor-dashboard" --verbose --schema "public" backup-production-28-02-2022.dump --disable-triggers --exit-on-error

# use the nginx.default.conf and voila

# backup database in production
$ docker exec -t postgres pg_dump --no-owner -U postgres sensor-dashboard > ../sensor-dashboard-database-backups/backup
```

## Restore from dump on windows

Data only restore, migration inserts will fail but the rest should succeed.

```bash
$ pg_restore --host "localhost" --port "5433" --username "postgres" --dbname "sensor-dashboard" --verbose --schema "public" "C:\Users\xtrinch\Downloads\backup-production-21-12-2020.dump"
```
