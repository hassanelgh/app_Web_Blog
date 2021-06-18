'use strict';
var faker = require('faker');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    var data=[];

    for(var i=0 ; i<20 ; i++)
    {
        data.push({
          username: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: i==0?'admin' :(i<=10 ? 'author' :'guest'),
          createdAt: new Date(),
          updatedAt: new Date()
          
         });
    }
    await queryInterface.bulkInsert('users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkDelete('users', null, {});

  }
};
