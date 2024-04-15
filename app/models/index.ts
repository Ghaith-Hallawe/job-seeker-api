
import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

const basename = path.basename(__filename);
import config from '../../config/app.config';
const databaseConfig: any = config['db'];
const db: any = {};
const sequelize: any = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, databaseConfig);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) ===  (config.app.env == 'development' ? '.ts' : '.js')))
  .forEach((file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
