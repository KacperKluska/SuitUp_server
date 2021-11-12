require('dotenv').config();

const typeorm = require('typeorm');

async function connect() {
  try {
    return await typeorm.createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASSWORD,
      database: 'SuitUp',
      synchronize: false,
      logging: false,
      entities: [
        require('../schemas/CartItemSchema'),
        require('../schemas/CartSchema'),
        require('../schemas/ColorSchema'),
        require('../schemas/FiguresSchema'),
        require('../schemas/OpinionSchema'),
        require('../schemas/OrderSchema'),
        require('../schemas/PatternSchema'),
        require('../schemas/ProductSchema'),
        require('../schemas/ProductTypeSchema'),
        require('../schemas/UserSchema'),
        require('../schemas/UserShipmentDetailsSchema'),
      ],
    });
  } catch (error) {
    console.log(`Couldn't connect to the database. ${error}`);
    return null;
  }
}

module.exports = { connect };
