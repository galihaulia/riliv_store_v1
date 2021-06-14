const util1 = require('../utils/apiBuildHandler');
const moment = require('moment');
const tag = 'ItemsController';
const schema = {
  productsSchema: {
    title: 'All Product',
    type: 'object',
    properties: {
      sumOfUser: {
        type: 'integer',
      },
      users: {
        type: 'array',
        items: {
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            desc: {
              type: 'string',
            },
            price: {
              type: 'integer',
            },
          },
        },
      },
    },
  },
  productSchema: {
    title: 'Product',
    properties: {
      id: {
        type: 'integer',
      },
      name: {
        type: 'string',
      },
      desc: {
        type: 'string',
      },
      price: {
        type: 'integer',
      },
    },
  },
  createProductSchema: {
    title: 'Create Product',
    properties: {
      product_name: {
        type: 'string',
      },
      product_desc: {
        type: 'string',
      },
      product_price: {
        type: 'integer',
      },
    },
  },
  updateProductSchema: {
    title: 'Update Product',
    properties: {
      product_id: {
        type: 'integer',
      },
      name: {
        type: 'string',
      },
      desc: {
        type: 'string',
      },
      price: {
        type: 'integer',
      },
    },
  },
  deleteProductSchema: {
    title: 'Delete Product',
    properties: {
      product_id: {
        type: 'integer',
      },
    },
  },
  buyProductSchema: {
    title: 'Buy Product',
    properties: {
      product_id: {
        type: 'integer',
      },
      quantity: {
        type: 'number',
      },
      message: {
        type: 'string',
      },
    },
  },
  listTransactionsSchema: {
    title: 'List Transaction',
    type: 'object',
    properties: {
      sumOfTransaction: {
        type: 'number',
      },
      list: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
            },
            codeTransaction: {
              type: 'string',
            },
            buyerId: {
              type: 'number',
            },
            productId: {
              type: 'number',
            },
            name: {
              type: 'string',
            },
            desc: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
          },
        },
      },
    },
  },
  buyProductsSchema: {
    title: 'Buy Products',
    properties: {
      products: {
        type: 'array',
        items: {
          properties: {
            product_id: {
              type: 'integer',
            },
            quantity: {
              type: 'number',
            },
          },
        },
      },
    },
  },
  listOrdersSchema: {
    title: 'List Orders',
    type: 'object',
    properties: {
      sumOfOrders: {
        type: 'number',
      },
      list: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
            },
            codeOrder: {
              type: 'string',
            },
            buyerId: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            isPayment: {
              type: 'boolean',
            },
            isFulfillment: {
              type: 'boolean',
            },
          },
        },
      },
    },
  },
};
const paths = {
  '/products': {
    get: {
      tags: [tag],
      summary: 'to retrieve all existing product data',
      parameters: [],
      responses: {
        200: {
          description: 'All Product',
          content: {
            'application/json': {
              schema: util1.getSchemaResponse(
                'productsSchema',
                'productsSchema',
                'object'
              ),
            },
          },
        },
      },
    },
  },
  '/product': {
    get: {
      tags: [tag],
      summary: 'to retrieve product data with product_id parameter',
      parameters: [
        {
          name: 'product_id',
          in: 'query',
          schema: {
            type: 'integer',
          },
          required: true,
        },
      ],
      responses: {
        200: {
          description: 'Product',
          content: {
            'application/json': {
              schema: util1.getSchemaResponse(
                'productSchema',
                'productSchema',
                'object'
              ),
            },
          },
        },
      },
    },
    post: {
      tags: [tag],
      summary: 'to create product data. however, only applies to admins',
      requestBody: {
        content: {
          'application/json': {
            schema: util1.getSchemaRequest('createProductSchema'),
          },
        },
      },
      responses: {
        200: {
          description: 'Create Product',
          content: {
            'application/json': {
              schema: {
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
    put: {
      tags: [tag],
      summary: 'to update product data. however, only applies to admins',
      requestBody: {
        content: {
          'application/json': {
            schema: util1.getSchemaRequest('updateProductSchema'),
          },
        },
      },
      responses: {
        200: {
          description: 'Update Product',
          content: {
            'application/json': {
              schema: {
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: [tag],
      summary: 'to delete product data. however, only applies to admins',
      requestBody: {
        content: {
          'application/json': {
            schema: util1.getSchemaRequest('deleteProductSchema'),
          },
        },
      },
      responses: {
        200: {
          description: 'Delete Product',
          content: {
            'application/json': {
              schema: {
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/products-buy': {
    post: {
      tags: [tag],
      summary:
        'to order products with various types of products and their quantity',
      requestBody: {
        content: {
          'application/json': {
            schema: util1.getSchemaRequest('buyProductsSchema'),
          },
        },
      },
      responses: {
        200: {
          description: 'Buy Products',
          content: {
            'application/json': {
              schema: {
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/product-orders': {
    get: {
      tags: [tag],
      summary: 'to take a list of ordered products',
      parameters: [
        {
          name: 'filter_by',
          description: '',
          in: 'query',
          schema: {
            type: 'string',
          },
          required: false,
        },
      ],
      responses: {
        200: {
          description: 'List Orders',
          content: {
            'application/json': {
              schema: util1.getSchemaResponse(
                'listOrdersSchema',
                'listOrdersSchema',
                'object'
              ),
            },
          },
        },
      },
    },
  },
  // '/product-buy': {
  //   post: {
  //     tags: [tag],
  //     requestBody: {
  //       content: {
  //         'application/json': {
  //           schema: util1.getSchemaRequest('buyProductSchema'),
  //         },
  //       },
  //     },
  //     responses: {
  //       200: {
  //         description: 'Buy Product',
  //         content: {
  //           'application/json': {
  //             schema: {
  //               properties: {
  //                 message: {
  //                   type: 'string',
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // '/product-transactions': {
  //   get: {
  //     tags: [tag],
  //     parameters: [],
  //     responses: {
  //       200: {
  //         description: 'List Transactions',
  //         content: {
  //           'application/json': {
  //             schema: util1.getSchemaResponse(
  //               'listTransactionsSchema',
  //               'listTransactionsSchema',
  //               'object'
  //             ),
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
};

exports.default = { schema, paths };
