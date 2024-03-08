'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jenis_laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  jenis_laundry.init({
    jenisID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    jenisCuci: DataTypes.ENUM('cuci satuan','cuci kering','cuci komplit'),
    namaCuci: DataTypes.STRING,
    harga: DataTypes.INTEGER,

  }, 
  {
    sequelize,
    modelName: 'jenis_laundry',
  });
  return jenis_laundry;
};