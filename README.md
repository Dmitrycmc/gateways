# Gateways

This sample project is managing gateways - master devices that control multiple peripheral
devices.
The task is to create a REST service (JSON/HTTP) for storing information about these
gateways and their associated devices. This information stored in the database.
Also, no more that 10 peripheral devices are allowed for a gateway.
The service also offer an operation for displaying information about all stored gateways
(and their devices) and an operation for displaying details for a single gateway. Finally, it
is possible to add and remove a device from a gateway.

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

## DTO
```ts
interface Device extends Document {
    uid: number;
    vendor: string;
    status: boolean;
    gatewayId: string | null;
}
interface Gateway extends Document {
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
* `lint` - used to fix codestyle
* `test` - used to run tests
* `heroku:build` - used to build both subprojects
* `heroku:deploy` - used to deploy to `heroku.com`

### Repository
https://github.com/Dmitrycmc/gateways

### Deployment
https://gateways.herokuapp.com/
