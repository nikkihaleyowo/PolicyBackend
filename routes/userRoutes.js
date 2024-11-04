const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')

const UserModel = require('../models/User');
const PolicyModel = require('../models/Policy');
const {findUserByEmail} = require('../util/userHelper');
const ImageModel = require('../models/Image');
const VerifiedUsersModel = require('../models/VerifiedUsers');
const AdminUsersModel = require('../models/AdminUsers');

router.get('/find/:email', async (req,res) => {
  const email = req.params.email;
  const user = await findUserByEmail(email);
  if(user!==null){
    res.status(200).json(user)
  }else{
    res.status(201).json({error: "no user found"});
  }
})

router.post('/create', async (req,res)=> {

  let isVerified = false;
  const verified = await VerifiedUsersModel.findOne({email: req.body.email})

  let isAdmin = false;
  const admin = await AdminUsersModel.findOne({email: req.body.email})

  if(verified)
    isVerified = true;
  if(admin)
    isAdmin = true;
  
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
    hasImage: false,
    verified: isVerified,
    admin: isAdmin
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

router.post('/imageUpload/:email', async (req,res) => {
  const body = req.body;
  const imageStore = {
    myFile: body.myFile,
    email: req.params.email,
  }
  try{
    const newImage = await ImageModel.create(imageStore);
    newImage.save();
    UserModel.findOneAndUpdate({email: req.params.email},{
      hasImage: true,
    },{new: true}).then(()=>{
      res.status(201).json({msg: 'new image uploaded'})
    }).catch(error => {
      res.json({message: error.message})
    });
  }catch(error){
    res.status(409).json({message: error.message})
  }
})

router.post('/imageUpdate/:email', async (req,res) => {
  const body = req.body;
  ImageModel.findOneAndUpdate({email: req.params.email},{
    myFile: body.myFile,
  },{new:true}).then(()=>{
    res.json({msg: "updated image"})
  }).catch(error=>{
    res.status(401).json({msg: error.message})
  })
})

router.get('/imageFind/:email', (req,res) =>{
  try{
    ImageModel.findOne({email:req.params.email}).then(data=>{
      res.json(data)
    }).catch(error=>{
      res.status(409).json(error)
    })
  }catch(error){
    res.json({error})
  }
})

module.exports = router;