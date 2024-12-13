const express = require('express');
const {handleUserRegistration, handleUserLogin, handleUserActivity} = require('../controller/userController');


const userRouter = express.Router();


userRouter.post('/register',handleUserRegistration);  
userRouter.post('/login',handleUserLogin);   
userRouter.post('/activity',handleUserActivity);
  

module.exports  = userRouter; 