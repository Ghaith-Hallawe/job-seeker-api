import { Sequelize } from 'sequelize';

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  const JobApplications: any = sequelize.define(
    'JobApplications',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postal: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      references: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      languages: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      race: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      disability_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cover_letter: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      salary: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      relocate: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      overtime: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      felony: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        allowNull: false,
      },
    },
    {
      tableName: 'Job_applications',
    },
  );

  JobApplications.associate = function (models: any) {
    JobApplications.belongsTo(models.JobPosts, {
      foreignKey: 'job_post_id',
      sourceKey: 'id',
    });
    JobApplications.belongsTo(models.Users, {
      foreignKey: 'user_id',
      sourceKey: 'id',
    });
  };

  return JobApplications;
};
