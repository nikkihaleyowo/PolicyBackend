const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')

const UserModel = require('../models/User');
const PolicyModel = require('../models/Policy');

router.put('/savePolicy', (req,res)=>{
  const email = req.body.email;
  console.log("called")
  UserModel.findOne({email:email})
  .then(user => {
    console.log("found")
      PolicyModel.create({
        title: req.body.title,
        data: req.body.data,
        rev: req.body.rev,
        approvalData: req.body.approvalDate,
        lastEdit: req.body.lastEdit,
        owner: user._id,
      }).then(p=>{
        console.log("added to user")
        UserModel.findByIdAndUpdate(user._id, {
          $push : {policy: {title: req.body.title, id: p._id}, 
          history: {title: req.body.title, id: p._id, modification: "Created Policy", date: req.body.lastEdit}
        }
          
        },{new: true}).then((user)=>{
          console.log("finsal")
          res.json({policy :p, user});
        })
        .catch(err=>{
          res.json(err)
        })
      }).catch(err=>{
        res.status(202).json({error: err});
      })
  }).catch(err=> {
    res.status(202).json({error: err});
  })
})

router.put('/updatePolicy',(req,res)=>{
  console.log('try update')
  const id = req.body.id;
  const newPol = req.body.pol;
  console.log(id)
  console.log(newPol)
  PolicyModel.findByIdAndUpdate(id, {...newPol},{new: true})
  .then(result =>{
    console.log('updatedaa')
    console.log(result)
    UserModel.findByIdAndUpdate(result.owner,{
      $push : {history: {title: result.title, id: result._id, modification: "Edited Policy", date: result.lastEdit}}
    },{new: true}).then((user)=>{
      console.log('updated')
      res.status(200).json({policy: result, user});
    })
  })
  .catch(err=> {
    res.status(202).json({error: err});
  })
})

router.get('/getPolicy/:id', (req,res)=>{
  const id = req.params.id;
  PolicyModel.findById(id)
  .then(pol=>{
    console.log(pol.title)
    res.status(200).json(pol)
  })
  .catch(err => res.status(201).json(err))
})

module.exports = router;