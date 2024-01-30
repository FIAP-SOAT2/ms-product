# PRODUCT MICROSERVICE

> Product microservice for snack bar order management system.


## What I need?

With this structure, your environment will have everything you need to build a project:

- Node, docker and docker-compose

## Running the application directly on your local machine

You can use these commands to start the application:

- `docker build -t order . --no-cache`
- `docker-compose up -d --force-recreate`

Docker-compose is set to start an instance of Postgres and the entire application.

- `npm run build`: builds app.
- `npm run start`: start the server.
- `npm run dev`: start the server in development mode.
## Swagger

http://localhost:4002/docs/

## Local Access - Endpoints Collection

To access the collection, import the "api-requests.postman_collection.json" file at the root of the project in your favorite consumer software

## Project architecture

This project was built using Clean Architecture and SOLID principles.

To separate concerns, the application was built with a Clean Architecture. It is divided into Domain, Application, Infra and Main layers.

### Domain Layer

The Domain layer contains the Entitites and it is in charge of the business logic of the application.
```bash
============= DOMAIN LAYER =====================================================================
entities
  L student
    L Product.ts          // product structure

enum
  L ProductEnum.ts
```
### Application Layer
The Application Layer implements all the use cases and contains the interfaces to interact with the outside world.
```bash
============= APPLICATION LAYER =================================================================
config

errors

interfaces
  L repositories
    L CreateProductRepository.ts         
    L DeleteProductRepository.ts
    L GetProductByFiltersRepository.ts  
    L GetProductByIdRepository.ts  
    L GetProductsRepository.ts  
    L UpdtateProductRepository.ts          
  L use-cases
    L UseCase.ts
    L product
        L CreateProductInterface.ts         
        L DeleteProductInterface.ts
        L GetProductByFiltersInterface.ts  
        L GetProductByIdInterface.ts  
        L GetProductsInterface.ts  
        L UpdtateProductInterface.ts   

use-cases                 // use cases implementation
  L product
    L CreateProduct.ts         
    L DeleteProduct.ts
    L GetProductByFilters.ts  
    L GetProductById.ts  
    L GetProducts.ts  
    L UpdtateProduct.ts      
```

### Infra Layer
The Infra Layer contains the controllers, database connections, repositories, that is, this layer has the concrete implementations of the application.
```bash
============= INFRA LAYER ======================================================================
database
  L migrations      
  L orm
    L prisma
        L schema.prisma 
    L prisma.ts
  L repositories
    L ProductRepository.ts

http
  L controllers     // request and response processing logic
  L errors
  L helpers
  L interfaces
  L middlewares
  L validations
  L validators
```

### Main Layer
The Main Layer is the entry point of the application. It contains the framework (Express), the routes, the factory method to inject the necessary dependencies.
```bash
============= MAIN LAYER ========================================================================
adapters

config

doc
  L swagger.yaml
  L swagger-config.ts

factories
  L controllers
  L use-cases

middlewares

routes
  L healthcheck.ts     // healthcheck route
  L product-route.ts   // product routes
```
## What we use?

#### Environment

- [Node](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

- [TypeScript](https://www.typescriptlang.org/) - TypeScript is JavaScript with syntax for types.

- [Prisma](https://www.prisma.io) - Next-generation Node.js and TypeScript ORM.

- [PostgreSQL](https://postgresql.org/) - PostgreSQL: The World's Most Advanced Open Source Relational Database.
