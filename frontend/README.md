# Sensor dashboard - react frontend

This is the frontend repo for the environmetal sensor dashboard.

See also [backend](https://github.com/xtrinch/sensor-dashboard-nestjs-backend) and [sensor board code](https://github.com/xtrinch/sensor-dashboard-ESP32-BME680-reader), or [see it live](http://iotfreezer.com) with some sensor data from my living room.

## Technology stack:

- React
- React context for state management
- Eslint for linting
- ReCharts for chart display

## Setup

Copy `.env.example` over to `env.local` and/or customize environment variables.
Run with `yarn start`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

### `yarn format`

Runs `eslint` and `prettier` and writes what they could fix to filesystem.

## Production setup
 
 ```bash
 $ docker-compose up -d
```

Will spin up a nginx container and copy the files into it. You should be able to access the frontend at the specified port.
