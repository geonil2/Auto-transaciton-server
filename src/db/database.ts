import { config } from '../config';
import SQ from 'sequelize';

const { host, user, database, password } = config.db;

export const sequelize = new SQ.Sequelize(database as string, user as string, password as string, {
    host,
    dialect: 'mysql',
    logging: false,
});
