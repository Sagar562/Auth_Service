const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS)),
    JWT_KEY: process.env.JWT_KEY
}