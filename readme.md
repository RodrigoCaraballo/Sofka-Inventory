# CQRS Microservice Backend

## How run the project

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
