require('dotenv').config();

const Sequelize = require('sequelize');

// Use JAWSDB_URL when deployed (Heroku); otherwise read local credentials from .env
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME || 'ecommerce_db',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

module.exports = sequelize;
