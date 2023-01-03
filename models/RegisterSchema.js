const mongoose = require('mongoose');
const schema =  mongoose.Schema;

const Register_Schema = new schema({
    email: { type: String },
    password: { type: String },
    confirm_password :{type:String}
  });

const Register_model = mongoose.model('register_collection', Register_Schema)

module.exports = Register_model