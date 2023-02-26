var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const userController = require('../controllers/userController')
var userRouter = express.Router();
 userRouter.route('/')
 .get(userController.index)
 .post(userController.regist)
 userRouter.route('/login')
 .get(userController.login)
module.exports = userRouter;
router.use(bodyParser.json());

module.exports = router;
