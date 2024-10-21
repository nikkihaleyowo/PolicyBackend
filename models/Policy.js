const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  data:{
    type: Object,
  },
  rev:{
    type: Number,
    default: 1.0
  },
  approvalDate:{
    type: String
  },
  lastEdit:{
    type: Date
  },
  owner:{
    type: mongoose.Types.ObjectId
  }
})

var PolicyModel = mongoose.model('policy', PolicySchema)

module.exports = PolicyModel