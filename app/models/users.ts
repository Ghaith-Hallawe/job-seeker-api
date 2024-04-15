import { Sequelize } from 'sequelize';

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  const Users: any = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mobile_number: {
        type: DataTypes.STRING,
      },
      is_email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female'),
      },
      user_type: {
        type: DataTypes.ENUM('intern', 'mentor', 'company', 'educator'),
      },
      password: {
        type: DataTypes.STRING,
      },
      last_login_date: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {},
  );

  Users.associate = function (models: any) {

    Users.hasMany(models.JobPosts, {
      foreignKey: 'user_id', 
      sourceKey: "id" 
    });
    Users.hasMany(models.JobApplications, {
      foreignKey: 'user_id', 
      sourceKey: "id" 
    });
  };
  return Users;
};
