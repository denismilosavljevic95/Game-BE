// src/instances/sequelize.ts

import { Sequelize } from 'sequelize';
import Logger from '../lib/logger';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: "mysql",
  port: 3306
});

sequelize.authenticate().then(() => {
    Logger.info('Uspesno authenticate')
   })
   .catch(err => {
     Logger.error('ERROR - Unable to connect to the database:' + err)
   })
