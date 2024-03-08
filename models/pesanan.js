'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //   this.hasMany(models.jenis_laundry,{
      //     foreignKey: "pesananID", as: "pesananJenis"
      //   })
      //   this.hasOne(models.detail_pesanan,{
      //     foreignKey: "pesananID", as: "detailPesanan"
      //   })
      //   this.belongsTo(models.detail_pesanan, { foreignKey: 'detailID' });
    }
  }
  pesanan.init({
    pesananID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    kodeInvoice : DataTypes.STRING,
    namaCust: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    noTelp: DataTypes.STRING,
    tgl: DataTypes.DATE,
    batasWaktu: DataTypes.DATE,
    tglPembayaran: DataTypes.DATE,
    status: DataTypes.ENUM('baru', 'proses', 'selesai', 'ambil'),
    statusBayar: DataTypes.ENUM('dibayar', 'belum'),
    userID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'pesanan',
  });
  return pesanan;
};