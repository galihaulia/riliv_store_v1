require('dotenv').config();
const asyncHandler = require('../middleware/asyncHandler');
const moment = require('moment');

const sequelize = require('sequelize');
const { Op } = sequelize;

const {
  DB_TABLES: { DB_USERS, DB_PURCHASINGS, DB_ITEMS, DB_ORDERS },
} = require('../lib/const');

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await DB_ITEMS.findAll({});

  let data = {
    sumOfProduct: 0,
    items: [],
  };

  if (products) {
    data.sumOfProduct = products.length;
    data.items = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        desc: product.desc,
        price: product.price,
      };
    });
  }

  res.jsend.success(data);
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { product_id } = req.query;

  const product = await DB_ITEMS.findOne({
    where: {
      id: product_id,
    },
  });

  let data;
  if (product) {
    data = {
      id: product.id,
      name: product.name,
      desc: product.desc,
      price: product.price,
    };
  } else {
    return res.status(400).jsend.error({
      message: 'Product not found',
    });
  }

  res.jsend.success(data);
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  const { product_name, product_desc, product_price } = req.body;
  const { id, privilegesId } = req.user;

  if (privilegesId == 1) {
    try {
      const createProd = await DB_ITEMS.create({
        usersId: id,
        name: product_name,
        desc: product_desc,
        price: product_price,
      });

      res.jsend.success({
        message: 'Product has been created.',
      });
    } catch (error) {
      return res.status(400).jsend.error({
        message: 'Failed! Product has not been created.',
      });
    }
  } else {
    return res.status(400).jsend.error({
      message: 'User is not Admin.',
    });
  }
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { product_id, name, desc, price } = req.body;
  const { id, privilegesId } = req.user;

  const now = new Date();

  const product = await DB_ITEMS.findOne({
    where: {
      id: product_id,
    },
  });

  if (privilegesId == 1 && product) {
    (product.name = name), (product.desc = desc), (product.price = price);
    product.updatedAt = now;
    await product.save();

    res.jsend.success({
      message: 'Product has been updated.',
    });
  } else {
    if (privilegesId != 1) {
      return res.status(400).jsend.error({
        message: 'User is not Admin.',
      });
    }
    if (!product) {
      return res.status(400).jsend.error({
        message: 'Product not found.',
      });
    }
  }
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { product_id } = req.body;
  const { id, privilegesId } = req.user;

  const findProduct = await DB_ITEMS.findOne({
    where: {
      id: product_id,
    },
  });

  if (privilegesId == 1 && findProduct) {
    findProduct.destroy();

    res.jsend.success({
      message: 'Product has been deleted.',
    });
  } else {
    if (privilegesId != 1) {
      return res.status(400).jsend.error({
        message: 'User is not Admin.',
      });
    }
    if (!findProduct) {
      return res.status(400).jsend.error({
        message: 'Product not found.',
      });
    }
  }
});

exports.productsBuy = asyncHandler(async (req, res, next) => {
  const { products } = req.body;
  const { id } = req.user;

  if (products instanceof Array) {
    let price = 0;
    for (const product of products) {
      const findProduct = await DB_ITEMS.findOne({
        where: {
          id: product.product_id,
        },
      });
      price += parseFloat(findProduct.price * product.quantity);
    }

    try {
      const createOrder = await DB_ORDERS.create({
        // codeOrder: `CODE${moment().format('YYYYMMDDHHmmss')}OR${id}RILIV`,
        codeOrder: `CODE${moment().format('YYHmmss')}OR${id}RILIV`,
        buyerId: id,
        isPayment: false,
        isFulfillment: false,
        price: price,
      });

      res.jsend.success({
        message: 'Product has been ordered.',
      });
    } catch (error) {
      return res.status(400).jsend.error({
        message: 'Failed! Product not been ordered.',
      });
    }
  } else {
    return res.status(400).jsend.error({
      message: 'Products is not an array.',
    });
  }
});

exports.listOrders = asyncHandler(async (req, res, next) => {
  const { filter_by } = req.query;
  const { id, privilegesId } = req.user;

  let query = {
    where: {},
  };
  let subQuery = {
    where: {},
  };

  if (privilegesId != 1) {
    query.where['buyerId'] = id;
  }

  if (filter_by) {
    if (filter_by.toUpperCase().includes('CODE')) {
      query.where['codeOrder'] = {
        [Op.iLike]: `%${filter_by.toUpperCase()}%`,
      };
    } else {
      subQuery.where['email'] = {
        [Op.iLike]: `%${filter_by.toLowerCase()}%`,
      };
    }
  }

  const orders = await DB_ORDERS.findAll({
    ...query,
    include: [
      {
        model: DB_USERS,
        as: 'buyer',
        ...subQuery,
      },
    ],
  });

  let data = {
    sumOfOrders: 0,
    list: [],
  };
  if (orders) {
    data.sumOfOrders = orders.length;
    data.list = orders.map((order) => {
      return {
        id: order.id,
        codeOrder: order.codeOrder,
        buyerId: order.buyer.email,
        price: order.price,
        isPayment: order.isPayment,
        isFulfillment: order.isFulfillment,
        dateCreation: order.createdAt,
      };
    });
  }

  res.jsend.success(data);
});

// exports.productBuy = asyncHandler(async (req, res, next) => {
//   const { product_id, quantity, message } = req.body;
//   const { id } = req.user;

//   const product = await DB_ITEMS.findOne({
//     where: {
//       id: product_id,
//     },
//   });

//   if (product) {
//     try {
//       const createPurchasing = await DB_PURCHASINGS.create({
//         codeTransaction: `CODETR${moment().format('YYYYMMDD')}${
//           product.id
//         }${id}RILIV`,
//         buyerId: id,
//         itemsId: product.id,
//         itemsName: product.name,
//         itemsDesc: product.desc,
//         price: product.price * quantity,
//         message: message,
//       });

//       res.jsend.success({
//         message: 'Product has been purchased.',
//       });
//     } catch (error) {
//       return res.status(400).jsend.error({
//         message: 'Failed! Product not been purchased.',
//       });
//     }
//   } else {
//     return res.status(400).jsend.error({
//       message: 'Product not found.',
//     });
//   }
// });

// exports.listTransactions = asyncHandler(async (req, res, next) => {
//   const { id, privilegesId } = req.user;

//   let query = {
//     where: {},
//   };

//   if (privilegesId != 1) {
//     query.where['buyerId'] = id;
//   }

//   const transactions = await DB_PURCHASINGS.findAll({
//     ...query,
//   });

//   let data = {
//     sumOfTransaction: 0,
//     list: [],
//   };
//   if (transactions) {
//     data.sumOfTransaction = transactions.length;
//     data.list = transactions.map((transaction) => {
//       return {
//         id: transaction.id,
//         codeTransaction: transaction.codeTransaction,
//         buyerId: transaction.buyerId,
//         productId: transaction.itemsId,
//         name: transaction.itemsName,
//         desc: transaction.itemsDesc,
//         price: transaction.price,
//         message: transaction.message ? transaction.message : null,
//       };
//     });
//   }

//   res.jsend.success(data);
// });
