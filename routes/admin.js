var express = require('express');
var router = express.Router();

var{
    getadminloginpage,
    getdologin,
    adminhome,
    getadminproductpage,
    addproduct

}=require('../controllers/admincontroller')

 router.get('/',getadminloginpage)
 router.get('/addproduct',getadminproductpage)
 router.post('/addproduct',addproduct)
router.get('/home',adminhome)
router.post('/login',getdologin)




module.exports = router;
