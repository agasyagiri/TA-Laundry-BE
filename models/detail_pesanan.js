'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_pesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  detail_pesanan.init({
    detailID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    pesananID: DataTypes.INTEGER,
    jenisID: DataTypes.INTEGER,
    qty: DataTypes.TEXT,
    totalHarga: DataTypes.DOUBLE,
    totalBayar: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'detail_pesanan',
  });
  return detail_pesanan;
};