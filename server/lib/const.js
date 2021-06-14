const {
  Users,
  Tokens,
  Purchasings,
  Items,
  Privileges,
  Orders,
} = require('../models');

exports.DB_TABLES = {
  DB_USERS: Users,
  DB_TOKENS: Tokens,
  DB_PURCHASINGS: Purchasings,
  DB_ITEMS: Items,
  DB_PRIVILEGES: Privileges,
  DB_ORDERS: Orders,
};
