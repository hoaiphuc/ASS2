var express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController')
var userRouter = express.Router();
const { ensureAuthenticated } = require('../config/auth')

userRouter.use(bodyParser.json())

userRouter.route('/')
  .get(userController.index)
  .post(userController.regist)

userRouter.route('/login')
  .get(userController.login)
  .post(userController.signin)

userRouter.route('/logout')
  .get(userController.signout)

userRouter.route('/dashboard')
  .get(ensureAuthenticated, userController.dashboard)


module.exports = userRouter;
