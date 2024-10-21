const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const auth = require('./authMiddleware')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes');
const policyRoutes = require('./routes/policyRoutes');

const port = 3001;

app.use(cors());
app.use(express.json())

mongoose.connect("mongodb+srv://nickhacklf:670craft@james-webdb.x1r5f.mongodb.net/?retryWrites=true&w=majority&appName=James-WebDB")

app.use('/api/users', userRoutes);
app.use('/api/policy', policyRoutes)


//public endpoint
/*app.get('/', (req,res) => {
  res.send('public')
})*/

/*app.get('/protected', auth, (req,res)=>{
  res.send('secured poon')
});*/

//error handling
/*app.use(function (err, req,res,next){
  console.log(err)
  switch(err.name){
    case 'UnauthorizedError':
      res.status(401).send('Unauthorized')
      break;
    case 'InvalidTokenError':
      
      res.status(401).send('invalid token')
      break;
    default:
      next(err);
  }
});*/

app.listen(port, () => {
  console.log('running on port: '+port);
})