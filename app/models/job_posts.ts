import { Sequelize } from 'sequelize';

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  const JobPosts: any = sequelize.define(
    'JobPosts',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      jh_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employment_type: {
        type: DataTypes.INTEGER(3),
      },
      minimum_experience: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      confidential: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      job_status: {
        type: DataTypes.INTEGER(3),
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      syndication: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      workflow_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      cover_letter: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      references: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      what_makes_you_unique: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      linked_in: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      website: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      twitter_username: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      earliest_start_date: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      work_on_weekends: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      work_on_evenings: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      work_overtime: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      languages: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      desired_salary: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      referral_name: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      valid_driver_license: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      commercial_driving_license: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      relocate: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      citizen: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      education: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      college: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      grade_point_average: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      over18: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      flight_hours: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      flight_grade: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      felony: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      felony_explain: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      internal_job_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      job_category: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      approved_salary_range_minimum: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      approved_salary_range_maximum: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      job_notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      open_date: {
        type: DataTypes.DATE,
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
      tableName: 'Job_posts'
    },
  );

  JobPosts.associate = function (models: any) {
    JobPosts.belongsTo(models.Users, {
      foreignKey: 'user_id',
      sourceKey: 'id',
    });
    JobPosts.hasMany(models.JobApplications, {
      foreignKey: 'job_post_id',
      sourceKey: 'id',
    });
    JobPosts.belongsTo(models.Countries, {
      foreignKey: 'country_id',
      sourceKey: 'id',
    });
  };

  return JobPosts;
};
