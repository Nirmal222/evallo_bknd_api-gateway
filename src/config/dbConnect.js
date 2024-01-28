const mongoose = require('mongoose');
require('dotenv').config();

const connect = ()=>{
    return mongoose.connect("mongodb+srv://nirmalkumargurajada:HJVagYU59h3CgiTv@evallo.fibftn5.mongodb.net/Evallo");
}

module.exports = connect;
