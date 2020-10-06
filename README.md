# ID2207 Project - Group 3

## Getting started

### Using Docker Compose

To get the system started using Docker Compose, simply run:

```
docker-compose up --build
```

This should build all the required files and the frontend should start on port `80` and the backend should start running on port `2000`.

### Using Yarn (node)

If you do not have access to Docker, use Yarn instead. If you do not have Yarn installed, follow the instructions specified [here](https://classic.yarnpkg.com/en/docs/install/).

#### Frontend

Navigate into the frontend directory (`cd frontend/`) and run `yarn install` to install the required dependencies. After this is done, run `yarn start` to run the application, it should start on port `3000`. If you want to run on a different port, run `PORT=<PORT_NUMBER> yarn start`, where `<PORT_NUMBER>` is the desired port.

#### Backend

Navigate into the backend directory (`cd backend/`) and run `yarn install` to install the required dependencies. After this is done, run `yarn start` to run the server, it should start on port `2000`. If you want to run on a different port, run `API_PORT=<PORT_NUMBER> yarn start`, where `<PORT_NUMBER>` is the desired port.

If you want to start the application with predefined user for each possible role, run `yarn start:mock`.

## Available mock users

### Emails

**Customer Service**: customerService@test.se

**Senior Customer Service Officer**: seniorCustomerService@test.se

**Administration Manager**: administrationManager@test.se

**HR**: HR@test.se

**Financial Manager**: financialManager@test.se

**Production Manager**: productionManager@test.se

**Production Team Member**: productionTeamMember@test.se

**Service Manager**: serviceManager@test.se

**Service Team Member**: serviceTeamMember@test.se

### Passwords

All of the mock users have password set to `password`

### Persistent storage

Although this project does not include a proper solution for persistent storage, you can create an **initial** storage by creating a file `storage.json` inside the `backend/` directory. When the server starts it will parse the data specified and create a replica of it as its initial store. An example of how this could look like is located in `backend/storage.example.json`. Simply run `cp backend/storage.example.json backend/storage.json` to use the example directly

## Tests

There are multiple tests for the backend which are developed using `jest`, they are located under `backend/tests/`.

To run all the tests, simply run `yarn test`. If you only want to run a single test file, run `yarn test tests/<file>`, for example: `yarn test tests/user.test.ts`
