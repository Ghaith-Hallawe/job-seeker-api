import { Sequelize } from "sequelize";


module.exports = (sequelize: Sequelize, DataTypes: any) => {
  const Roles: any = sequelize.define('Roles', {
    roleName: DataTypes.STRING
  }, {});
  Roles.associate = function () {
    // TODO
    // associations can be defined here
  };
  return Roles;
};
