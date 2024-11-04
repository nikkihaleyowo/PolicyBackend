const mongoose = require('mongoose');

const VerifiedUsersSchema = new mongoose.Schema({
  email:{
    type: String
  },
  time : { 
    type : Date, 
    default: Date.now 
  }
})

var VerifiedUsersModel = mongoose.model('verifiedUsers', VerifiedUsersSchema)

module.exports = VerifiedUsersModel