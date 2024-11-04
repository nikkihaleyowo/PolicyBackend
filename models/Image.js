const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  myFile: {
    type: String,
  },
  email:{
    type: String
  }
})

var ImageModel = mongoose.model('image', ImageSchema)

module.exports = ImageModel