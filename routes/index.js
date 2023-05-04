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
  getlogoutpage
} = require('../controllers/userController')

router.get('/',getHomePage );

router.get('/login',getLoginPage );

router.get('/registers',getRegisterPage );

router.get('/myorder',checkuser,getcartpage)

router.get('/logout',getlogoutpage)

router.post('/register',doRegister);

router.post('/login',dologin);
 
module.exports = router;
