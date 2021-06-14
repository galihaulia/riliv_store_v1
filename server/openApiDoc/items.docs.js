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
};
const paths = {
  '/products': {
    get: {
      tags: [tag],
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
  '/product-buy': {
    post: {
      tags: [tag],
      requestBody: {
        content: {
          'application/json': {
            schema: util1.getSchemaRequest('buyProductSchema'),
          },
        },
      },
      responses: {
        200: {
          description: 'Buy Product',
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
  '/product-transactions': {
    get: {
      tags: [tag],
      parameters: [],
      responses: {
        200: {
          description: 'List Transactions',
          content: {
            'application/json': {
              schema: util1.getSchemaResponse(
                'listTransactionsSchema',
                'listTransactionsSchema',
                'object'
              ),
            },
          },
        },
      },
    },
  },
};

exports.default = { schema, paths };
