const {
    Users,
    Tokens,
    Purchasings,
    Items,
    Privileges
  } = require('../models');
  
  exports.DB_TABLES = {
    DB_USERS: Users,
    DB_TOKENS: Tokens,
    DB_PURCHASINGS: Purchasings,
    DB_ITEMS: Items,
    DB_PRIVILEGES: Privileges
  };
  