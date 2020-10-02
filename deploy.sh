#!/bin/bash

cd ~
cd sensor-dashboard-nestjs-backend
git pull
docker-compose up -d --build
cd ~
cd sensor-dashboard-react-frontend
git pull
docker-compose up -d --build