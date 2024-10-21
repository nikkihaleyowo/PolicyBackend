const mongoose = require('mongoose');

const UserModel = require('../models/User');

const findUserByEmail = async (email) => {
  try{
    const user = await UserModel.findOne({email: email});
    if(user){
      return user;
    }else{
      return null;
    }
  }catch(error){
    console.log('error finding user: '+error);
    return null;
  }
}

module.exports = {
  findUserByEmail,

}