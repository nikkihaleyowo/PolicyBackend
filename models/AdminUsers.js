const mongoose = require('mongoose');

const AdminUsersSchema = new mongoose.Schema({
  email:{
    type: String
  },
  time : { 
    type : Date, 
    default: Date.now 
  }
})

var AdminUsersModel = mongoose.model('adminUsers', AdminUsersSchema)

module.exports = AdminUsersModel