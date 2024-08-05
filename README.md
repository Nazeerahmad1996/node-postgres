## Available Scripts

In the project directory, you can run:

### `npm i`

It will download all the required dependencies

## You need postgres connection keys.

## Environment Variables

```plaintext
NODE_ENV=development
APP_PORT=3001
DB_USERNAME=postgres
DB_PASSWORD=admin
DB_NAME=postgres
DB_HOST=localhost
DB_DIALECT=postgres
JWT_SECRET_KEY=Some secret keys
JWT_EXPIRY_DATE=10d
ADMIN_EMAIL=nazeer@gmail.com
ADMIN_PASSWORD=admin
REDIS_EXPIRE_KEY = 60
```

## Initialize squelize

```plaintext
npx sequelize-cli init
```

This will create following folders

config, contains config file, which tells CLI how to connect with database
models, contains all models for your project
migrations, contains all migration files
seeders, contains all seed files

```plaintext
https://sequelize.org/docs/v6/other-topics/migrations/
```
For more information


### Sequelize commands for create/migrate/seed

## Create tables model

```plaintext
npx sequelize-cli model:generate --name project --attributes title:string
npx sequelize-cli model:generate --name user --attributes title:string
```

## Migrate tables

```plaintext
npx sequelize-cli db:migrate // migrate table
npx sequelize-cli db:migrate:all // migrate all tables
npx sequelize-cli db:migrate:undo:all // to undo all tables from database
```

## Add Seed

```plaintext
npx sequelize-cli seed:generate --name admin-user // create seeder
npx sequelize-cli db:seeder:all // migrate it
```

## Configure Redis locally

```plaintext
Download Docker.
pull redis image and run the command.
docker run -p 6379:6379 -it redis/redis-stack-server:latest
```


## User types

```plaintext
0: Admin
1: Seller
2: Buyer
```
