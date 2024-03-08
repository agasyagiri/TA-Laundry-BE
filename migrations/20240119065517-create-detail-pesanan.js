'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_pesanans', {
      detailID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pesananID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pesanans",
          key: "pesananID"
        }
      },
      jenisID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "jenis_laundries",
          key: "jenisID"
        }
      },
      qty: {
        type: Sequelize.DOUBLE
      },
      totalHarga: {
        type: Sequelize.DOUBLE
      },
      totalBayar: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_pesanans');
  }
};