"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const salt = await bcrypt.genSaltSync(10);
    const adminId = await queryInterface.rawSelect(
      "Roles",
      {
        where: {
          nama_role: "admin",
        },
      },
      ["id"]
    );
    return queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        fullname: "Admin",
        email: "admin@mail.com",
        password: bcrypt.hashSync("administrator", salt),
        role_id: adminId,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
