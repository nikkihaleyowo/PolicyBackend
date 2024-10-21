const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address:{
    type: String
  },
  city:{
    type: String
  },
  zip:{
    type: String
  },
  state:{
    type: String
  },
})

const PolicyListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: ''
  },
  id: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

const HistorySchema = new mongoose.Schema({
  title: {
    type: String
  },
  id: {
    type: mongoose.Types.ObjectId
  },
  modification: {
    type: String
  },
  date: {
    type: Date
  }
})

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true 
  },
  company: CompanySchema,
  policy: [PolicyListSchema],
  history: [HistorySchema],
})

var UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel;