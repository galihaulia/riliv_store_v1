# riliv_store_v1

online shop application

## Architecture

PostgreSQL, Node JS, ORM Sequelize, JWT Auth, with swagger documentation

## API Docs

https://riliv-store-v1.herokuapp.com/api-doc/

can be tried on the url with the following account:

- admin:
  - email: admin@gmail.com
  - password: admin123
- buyer:
  - email: testing@gmail.com
  - password: user123

# How To Start in local

1. Clone the repo
   ```sh
   git clone https://github.com/galihaulia/riliv_store_v1.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. prepare local database settings in `.env` like [.env](https://github.com/galihaulia/riliv_store_v1/blob/master/.env.example)
4. Run migration
   ```sh
   npm run migrate
   ```
5. Run seeder
   ```sh
   npm run seed
   ```
6. Run application
   ```sh
   npm run start
   ```
