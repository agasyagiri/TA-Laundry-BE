'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pesanans', {
      pesananID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kodeInvoice: {
        type: Sequelize.STRING
      },
      namaCust: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.TEXT
      },
      noTelp: {
        type: Sequelize.STRING
      },
      tgl: {
        type: Sequelize.DATE
      },
      batasWaktu: {
        type: Sequelize.DATE
      },
      tglPembayaran: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('baru','proses','selesai','ambil')
      },
      statusBayar: {
        type: Sequelize.ENUM('dibayar','belum')
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "userID"
        }
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
    await queryInterface.dropTable('pesanans');
  }
};