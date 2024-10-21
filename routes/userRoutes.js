const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')

const UserModel = require('../models/User');
const PolicyModel = require('../models/Policy');
const {findUserByEmail} = require('../util/userHelper')

router.get('/find/:email', async (req,res) => {
  const email = req.params.email;
  const user = await findUserByEmail(email);
  if(user!==null){
    res.status(200).json(user)
  }else{
    res.status(201).json({error: "no user found"});
  }
})

router.post('/create', (req,res)=> {
  const newDoc = {
    email: req.body.email,
    company: {
      name: '',
      address: '',
      city: '',
      zip: '',
      state: '',
    },
    policy: [],
    history: [],
  }
  console.log(req.body)
  UserModel.create(newDoc)
  .then(user => {
    console.log(user)
    res.json(user)})
  .catch(err => {
    console.log("error")
    res.json(err)})
})

router.put('/update/:email', (req,res) => {
  const email = req.params.email;
  UserModel.findOneAndUpdate({email:email}, {
    company: {
    name: req.body.name, 
    address: req.body.address, 
    city: req.body.city,
    zip: req.body.zip,
    state: req.body.state,
  }},{new: true})
  .then(users => {
    console.log(users)
    res.json(users)})
  .catch(err => res.json(err))
})

module.exports = router;