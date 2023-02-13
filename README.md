<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Event Management system 
Event Management system where Companies should be able to post their upcoming events and users can register, login, manage their profiles and follow the companies

## Technologies
- Typescript / NestJs / Postgresql

## Features
- User can register as company or register as a normal user
- Company can create , edit and delete events 
- Company can manage it's profile
- User can see all companies 
- User can follow the companies
- Users can search for events by keywords, location, and date 
- User will receive notifications when these companies post events by mailtrap and websockets. 
- User can rsvp any event in the future
- Company can mark user as attended to track attendance 
- User can add feedback after attending the events
- User can see his events (Upcoming and past)
- Company can see feedback for its events
- swagger for documenting APIs
- Sample test case 


## Pre Installation
```preinstall
install node js version 16
install yarn
```


## Installation
```bash

$ git clone git@github.com:yassminediab/event-management-system-backend.git
$ docker compose up (to run postgres)
$ yarn install
$ yarn build
$ create your database eg(event-management-system)
$ cp .env.example .env
$ npx typeorm migration:run -d dist/typeorm-cli.config
```

## Running the app

```bash
# development
$ yarn start:dev

run application on port 3000
http://localhost:3000
```

## Tests

```bash
yarn test:e2e
```

## Swagger
You can run swagger on http://localhost:3000/docs to find all the endpoints and test it

![alt text](https://github.com/yassminediab/event-management-system-backend/blob/main/assets/Screen%20Shot%202023-02-14%20at%201.16.43%20AM.png?raw=true)
