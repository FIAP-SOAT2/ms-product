# Justificativa Para Utilização do Banco de Dados.
A escolha do PostgreSQL para nossa aplicação pode ser justificada por várias razões:

Desenvolvimento rápido e compatibilidade: Diversas bibliotecas e pacotes disponíveis que facilitam a integração entre aplicações NodeJs e o PostgreSQL.

Desempenho e Escalabilidade: O PostgreSQL é conhecido por seu desempenho robusto, capacidade de escalabilidade e suporte a índices avançados. Facilitando otimizações de infra sem alteração de código.

Maturidade: O PostgreSQL é um sistema de gerenciamento de banco de dados  de código aberto, altamente compatível com a linguagem SQL padrão e possui recursos avançados de um banco de dados relacional

Comunidade Ativa: Possui comunidade de desenvolvedores ativa e é frequentemente atualizado, facilitando a resolução de bugs e eventuais dúvidas sobre o seu comportamento.

Além disso, membros da equipe já tinham experiência com a sua utilização, o que favoreceu esse Banco de Dados dentre os demais.

# Arquitetura do Banco de Dados
![image](https://github.com/SOAT2/orders-project-clean-architecture/assets/54938008/b2608656-feef-4628-a66f-a51632b1f974)

# ORDERS PROJECT

> Order management system for a snack bar.


## What I need?

With this structure, your environment will have everything you need to build a project:

- Node, docker and docker-compose
- Kubectl and minikube (to deploy the application to a Kubernetes cluster)

## Running the application on a local Kubernetes cluster

- `minikube start`: starts the minikube to create a Kubernetes cluster.
- `cd orders-project-clean-architecture`: to be in the project's root directory
- `minikube ip`: get the minikube IP address


Now, you need to set this <b>IP Address</b> on Kubernetes Service (service.yaml) in externalIPs field:

```
spec:
  type: LoadBalancer
  ports:
  - name: "http"
    port: 3000
    targetPort: 3000
  externalIPs:
  - your-minikube-ip
  selector:
    app: orders-project
```

 Then you can deploy the application to the cluster:

- `kubectl apply -f deploy/`: apply all configuration files from the deploy folder to the created cluster.
- `kubectl port-forward <name-of-the-pod> 3000:3000`: run the application on your machine using the port 3000.

## Running the application directly on your local machine

You can use these commands to start the application:

- `docker build -t order . --no-cache`
- `docker-compose up -d --force-recreate`

Docker-compose is set to start an instance of Postgres and the entire application.

- `npm run build`: builds app.
- `npm run copy-swagger`: copies swagger to the dist folder.
- `npm run start`: start the server.
- `npm run dev`: start the server in development mode.
## Swagger

http://localhost:3000/docs/

## Local Access - Endpoints Collection

To access the collection, import the "api-requests.postman_collection.json" file at the root of the project in your favorite consumer software

## Project architecture

This project was built using Clean Architecture and SOLID principles.

To separate concerns, the application was built with a Clean Architecture. It is divided into Domain, Application, Infra and Main layers.

### Domain Layer

The Domain layer contains the Entitites and it is in charge of the business logic of the application.

### Application Layer
The Application Layer implements all the use cases and contains the interfaces to interact with the outside world.

### Infra Layer
The Infra Layer contains the controllers, database connections, repositories, that is, this layer has the concrete implementations of the application.


### Main Layer
The Main Layer is the entry point of the application. It contains the framework (Express), the routes, the factory method to inject the necessary dependencies.

## What we use?

#### Environment

- [Node](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

- [TypeScript](https://www.typescriptlang.org/) - TypeScript is JavaScript with syntax for types.

- [TypeOrm](https://typeorm.io/#/) - TypeOrm is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.

- [PostgreSQL](https://postgresql.org/) - PostgreSQL: The World's Most Advanced Open Source Relational Database
