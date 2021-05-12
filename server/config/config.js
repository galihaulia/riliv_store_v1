require('dotenv').config()

module.exports = {
  development: {
    username: process.env.PGNAME,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    dialect: process.env.PGDIALECT,
    login_field: process.env.LOGIN_FIELD,
    timezone: 'Asia/Jakarta'
  },
  test: {
    username: process.env.PGNAME,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    dialect: process.env.PGDIALECT,
    login_field: process.env.LOGIN_FIELD,
    timezone: 'Asia/Jakarta'
  },
  production: {
    username: process.env.PGNAME,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    dialect: process.env.PGDIALECT,
    login_field: process.env.LOGIN_FIELD,
    timezone: 'Asia/Jakarta'
  }
}
