# Gateways

This sample project is managing gateways - master devices that control multiple peripheral
devices.
The task is to create a REST service (JSON/HTTP) for storing information about these
gateways and their associated devices. This information stored in the database.
Also, no more that 10 peripheral devices are allowed for a gateway.
The service also offer an operation for displaying information about all stored gateways
(and their devices) and an operation for displaying details for a single gateway. Finally, it
is possible to add and remove a device from a gateway.

## Technologies

### API
* TypeScript
* Nest.js
* MongoDB
* Mongoose

### SPA
* TypeScript
* Angular

## Usage
API supports CRUD operations with devices:
* GET `/api/devices`
* POST `/api/devices`
* GET `/api/devices/:id`
* POST `/api/devices/:id`
* PATCH `/api/devices/:id`
* DELETE `/api/devices/:id`

And with gateways:
* GET `/api/gateways`
* POST `/api/gateways`
* GET `/api/gateways/:id`
* POST `/api/gateways/:id`
* PATCH `/api/gateways/:id`
* DELETE `/api/gateways/:id`

Web UI allows managing gateways and devices via forms and drag'n'drop mechanic

## DTO
```ts
interface Device {
    uid: number;
    vendor: string;
    status: boolean;
    gatewayId: string | null;
}
interface Gateway {
    serialNumber: string;
    name: string;
    IPv4: string;
}
```

## Errors
* NotFoundError - entity not found
* TooManyDevicesError - number of attached devices exceeded
* DuplicateSerialNumberError - serial number is not unique

## Npm scripts
* `start:dev` - used for local development
* `start` - used for start on the server
* `lint` - used to fix code style
* `test` - used to run tests
* `heroku:build` - used to build both subprojects
* `heroku:deploy` - used to deploy to `heroku.com`

## Screenshots

### Desktop
<img width="1726" alt="Desktop" src="https://user-images.githubusercontent.com/38041284/235147325-b45a029b-2424-4b4c-a437-31fb8ce9da8b.png">

### Mobile
<img width="320px" alt="Mobile" src="https://user-images.githubusercontent.com/38041284/235146702-89c2b6d5-46fd-4873-8b01-2e044eb07cba.png">

## Links

### Repository
https://github.com/Dmitrycmc/gateways

### Deployment
https://gateways.herokuapp.com/
