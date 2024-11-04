const VerifiedUsersModel = require('../models/VerifiedUsers');

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const AdminUsersModel = require('../models/AdminUsers');
const UserModel = require('../models/User');

router.get('/getData', async (req,res)=>{
  const allVerified = await VerifiedUsersModel.find();
  //console.log("verified: "+allVerified.length);
  
  const userList = [];
  allVerified.map(user =>{
    userList.push(user.email)
  })

  res.json({verified: allVerified.length, userList})
})

router.post('/addVerified', (req,res) =>{
  VerifiedUsersModel.create({email:req.body.email})
  .then(() =>{
    console.log('added new user')
    UserModel.findOneAndUpdate({email:req.body.email},
      {verified:true}
    ).then(doc=>{
      console.log(doc)
    }).catch(err=>{
      console.log("no user")
    })
    res.status(201).json({message: "user Added"})
  }).catch(()=>{
    res.status(401).json({message: "user couldnt be added"})
  })
})

router.post('/removeVerified', (req,res) =>{
  VerifiedUsersModel.deleteOne({email: req.body.email})
  .then(deletedDoc => {
    
    if(deletedDoc.deletedCount>0){
      console.log("user found")
      UserModel.findOneAndUpdate({email:req.body.email},
        {verified:false}
      ).then(doc=>{
        console.log(doc)
      }).catch(err=>{
        console.log("no user")
      })
      res.status(201).json({message: 'user removed'})
    }else{
      res.status(202).json({message: 'user doesnt exists'})
    }
  }).catch((error)=>{
    console.log(error)
  })
})

router.post('/addAdmin', (req,res) =>{
  AdminUsersModel.create({email:req.body.email})
  .then(() =>{
    res.status(201).json({message: "admin Added"})
  }).catch(()=>{
    res.status(401).json({message: "admin couldnt be added"})
  })
})

module.exports = router;