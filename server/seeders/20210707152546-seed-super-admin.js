'use strict';

const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../utils/bcrypt')
const SUPER = process.env.SUPER

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      user_name: 'big bos',
      email: 'bigbos@gmail.com',
      password: hashPassword("superadmin123"),
      phone_number: '081232322132',
      verfy_phone_number: true,
      role: 'super_admin',
      email_verfy_code: 'jkk43509i23(&^-9234jb',
      email_verfy_status: true,
      createdAt: new Date(),
      updatedAt: new Date()

    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
