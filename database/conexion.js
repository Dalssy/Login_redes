const { Sequelize } = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize('db_accounts', 'root', '', {
//   host: 'dpg-cnimso6n7f5s73cp1jvg-a',
//   password:'8Xv9BFO10Ix7M6Z2wWhDtigXqi21Oelc',
//   port: 5432,
//   dialect: 'postgres',
// });
const sequelize = new Sequelize(process.env.DATABASE_URL);
// const sequelize = new Sequelize('postgres://root:8Xv9BFO10Ix7M6Z2wWhDtigXqi21Oelc@dpg-cnimso6n7f5s73cp1jvg-a.oregon-postgres.render.com/db_accounts?ssl=true');

module.exports = sequelize;