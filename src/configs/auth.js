const dotenv = require('dotenv')

dotenv.config()

const config = require('./configs/auth');
const secret = config().jwt.secret; // Note os parênteses ()

module.exports = authConfig