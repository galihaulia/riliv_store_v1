'use strict';
const bcrypt = require('bcryptjs')
const password = 'admin123'
const passClient = 'user123'

const salt = bcrypt.genSaltSync(10)
module.exports = {
  up: async(queryInterface, Sequelize) => {
    const now = new Date()

    //create privilege
    const privileges = await queryInterface.bulkInsert(
      'Privileges',
      [
        {
          name : 'Admin',
          createdAt : now,
          updatedAt : now
        },
        {
          name : 'Buyer',
          createdAt : now,
          updatedAt : now
        }
      ],
      {
        returning : true
      }
    )
    const [pAadmin,pBuyer] = privileges
    console.debug(`privilege created ${privileges.length}`)

    //create user
    const users = await queryInterface.bulkInsert(
      'Users',
      [
        {
          email:'admin@gmail.com',
          password : bcrypt.hashSync(password,salt),
          privilegesId: pAadmin.id,
          createdAt : now,
          updatedAt : now
        },
        {
          email:'testing@gmail.com',
          password : bcrypt.hashSync(passClient,salt),
          privilegesId: pBuyer.id,
          createdAt : now,
          updatedAt : now
        }
      ],
      {
        returning:true
      }
    )
    console.debug(`user created ${users.length}`)
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Privileges')
    await queryInterface.bulkDelete('Users')
  }
};
