import { Sequelize } from 'sequelize';

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  const Countries = sequelize.define(
    'Countries',
    {
      id: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {},
  );

  return Countries;
};
