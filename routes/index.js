var express = require('express');
var router = express.Router();
var checkuser=require("../middleware/checkUser")

var {
  getHomePage,
  getLoginPage,
  getRegisterPage,
  doRegister,
  dologin,
  getcartpage,
  getlogoutpage,
  addtocart,
  checkouts,
  single,
  verify
} = require('../controllers/userController')

router.get('/',getHomePage );

router.get('/login',getLoginPage );

router.get('/registers',getRegisterPage );

router.get('/myorder',checkuser,getcartpage)

router.get('/logout',getlogoutpage)

router.get('/addtocart/:pid',addtocart)

router.get('/buy-now/:pid',single)

router.get('/checkout/:id/:price',checkouts)

router.post('/register',doRegister);

router.post('/login',dologin);

router.post('/varify',verify)

 
module.exports = router;
