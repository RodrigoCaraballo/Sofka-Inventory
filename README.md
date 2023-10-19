# CQRS Microservice Backend
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## How run the project

## Installation

```bash
$ pnpm install
```

### Local Option

1. CREATE DOCKER IMAGES
```cmd
docker run --name rabbit-nest -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```
```cmd
docker run --name db-ms -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=db mysql
```
```cmd
docker run --name db-mg -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password -e MONGO_INITDB_DATABASE=db -p 27017:27017 mongo
```

2. SET THE .ENV FILE BASED ON YOUR DOCKER ENVS
```env
MONGO_DB_URI = mongodb://root:password@127.0.0.1:27017/db?authSource=admin

RABBIT_MQ_URI = amqp://127.0.0.1:5672/
FRONT_URL = [FRONT URL OPTIONAL]

MYSQL_DB_USER = root
MYSQL_DB_PASSWORD = password
MYSQL_DB_PORT = 3306
MYSQL_DB_HOST = 127.0.0.1
MYSQL_DB_DATABASE = db
```

3. AND START ALL MICROSERVICE

Command Service
```cmd
pnpm run start-command:dev
```
Query Service
```cmd
pnpm run start-query:dev
```
Socket Service
```cmd
pnpm run start-socket:dev
```
Auth Service
```cmd
pnpm run start-auth:dev
```

### Docker Option
1. On ./ Path RUN:
```cmd
docker compose up
```

2. SET THE .ENV FILE BASED ON YOUR DOCKER ENVS
```env
MONGO_DB_URI = mongodb://root:password@mongo-inventory:27017/db?authSource=admin

RABBIT_MQ_URI = amqp://rabbitmq-inventory:5672/
FRONT_URL = [FRONT URL OPTIONAL]

MYSQL_DB_USER = root
MYSQL_DB_PASSWORD = password
MYSQL_DB_PORT = 3306
MYSQL_DB_HOST = mysql-inventory
MYSQL_DB_DATABASE = db
```

## ENDPOINTS

### AUTH SERVICE ENDPOINT
POST /api/v1/auth
BODY
```
{
  email: string;
  password: string;
}
```

### COMMAND SERVICE ENDPOINT
POST /api/v1/branch/register - (BEARER TOKEN & SUPER ADMIN ROLE REQUIRED)
BODY
```
{
  name: string;
  country: string;
  city: string;
}
```

POST /api/v1/product/register - (BEARER TOKEN & ADMIN ROLE REQUIRED)
BODY
```
{
  name: string;
  description: string;
  price: number;
  category: string;
  branchId: string;
}
```

POST /api/v1/product/purchase - (BEARER TOKEN REQUIRED)
BODY
```
[
    {
        branchId: string;
        product: {
            id: string;
            inventoryStock: number;
    }  
  }
]
```

POST /api/v1/product/customer-sale - (BEARER TOKEN REQUIRED)
BODY
```
{
  branchId: string;
  product: [
      {
        id: string;
        inventoryStock: number;
    }
  ]
}
```

POST /api/v1/product/reseller-sale - (BEARER TOKEN REQUIRED)
BODY
```
{
  branchId: string;
  product: [
      {
        id: string;
        inventoryStock: number;
    }
  ]
}
```

POST /api/v1/product/return-sale - (BEARER TOKEN REQUIRED)
BODY
```
{
  branchId: string;
  saleId: string;
  productId: string;
  invoiceNumber: string;
  inventoryStock: number;
}
```

POST /api/v1/user/register - (BEARER TOKEN & ADMIN ROLE REQUIRED)
BODY
```
{
  name: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
  branchId: string;
}
```

### QUERY SERVICE ENDPOINT
GET /api/v1/branch/register/branch/:branchId - (BEARER TOKEN REQUIRED)

GET /api/v1/branch/register/sales/:branchId - (BEARER TOKEN REQUIRED)

GET /api/v1/branch/register/branches - (BEARER TOKEN REQUIRED)

### SOCKET SERVICE ENDPOINT

WS PORT 3004


## License

Nest is [MIT licensed](LICENSE).
