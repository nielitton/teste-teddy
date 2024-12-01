# API CRUD de Clientes - NestJS com TypeORM

Bem-vindo ao repositório da API de gerenciamento de clientes, desenvolvida em **NestJS** com **TypeORM**. Esta aplicação foi criada como parte de um teste para a empresa **Teddy**.

## Tecnologias Utilizadas

- **NestJS**: Framework para Node.js que facilita o desenvolvimento de APIs, com foco em estrutura e escalabilidade.
- **TypeORM**: ORM (Object-Relational Mapper) para interagir com o banco de dados de forma eficiente.
- **PostgreSQL**: Banco de dados utilizado para armazenar os dados da aplicação.
- **Swagger**: Ferramenta para documentar e testar APIs de maneira interativa.

---

## Requisitos para a aplicação
- Docker
- Node.js e Npm (ou yarn) instalados

## Como Iniciar a Aplicação

-- Após a intalação você pode acessar: http://localhost:3333/api
para acessar o **Swagger** da aplicação

### Passo 1: Subir o Banco de Dados com Docker

Para rodar a aplicação, é necessário ter um banco de dados PostgreSQL configurado. A maneira mais fácil de subir o banco é utilizando o **Docker**.

Execute o comando abaixo para subir o banco de dados utilizando o Docker Compose:

```bash
docker compose up -d
```

### Passo 2: Instalar as dependências do projeto

Para instalar as dependências do projeto, para conseguir iniciar a aplicação

Execute o comando abaixo para instalar as dependências.

```bash
npm install
```

### Passo 3: Rodar as migrations do projeto

Para que tudo funcione corretamente e gerarmos nossas tabelas, você precisa digitar o seguinte comando.

```bash
npm run migration:run
```

### Passo 4: Iniciar o projeto

Com todos os passo concluídos corretamente, você pode estar rodando o projeto com o comando.

```bash
npm run start:dev ou npm run start
```

## Swagger

Você pode verificar se a aplicação está funcionando acessando o swagger da aplicação na url: http://localhost:3333/api

Lá você pode verificar todos os endpoints e também saber como usa-los

## Endpoints

Aqui seguem os endpoints e como usa-los

### GET /client

Esse endpoint te retorna um lista de clientes com as propriedades: clients (Um array de clients), count (A quantidade de clientes em toda a aplicação), ele filtra por uma propriedade do cliente chamada active, onde só busca por quem está ativo, assim possibilitando o soft delete

Você pode usar as queryes, limit (limita a quantida de clientes retornados), page (pagina de clientes), filterByName (filtra pelo nome da pessoa)

- Exemplo: http://localhost:3333/client?page=1&limit=4&filterByName=Nielitton

### GET /client/${id}

Esse endpoint te retorna detalhadamente o cliente na qual você pesquisou pelo ID.

http://localhost:3333/client/${id}

### DELETE /client/${id}

Soft delete, altera a propriedade active do cliente, para não apagar permanentemente o cliente do banco.

### POST /client

Cria um cliente, para isso você precisa passar as propriedades no Body, como por exemplo

{
  name: "Nielitton",
  wage: 4500.00,
  enterprise: 1000000.00
}

### PATCH /client/${id}

Atualiza um cliente pelo id, para isso você precisa passar as propriedades no Body, como por exemplo

{
  name: "Nielitton",
  wage: 4500.00,
  enterprise: 1000000.00
}

ou 

{
  name: "Nieliton Sousa"
}

assim ele retorna o usuário atualizado.