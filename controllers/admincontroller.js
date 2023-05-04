var con=require('../config/config')
const getadminloginpage=((req,res)=>{
    
    res.render('admin/login')

})

const adminhome=((req,res)=>{
    res.render('admin/adminhome')
})

const getadminproductpage=((req,res)=>{
    res.render('admin/adminproductpage')
})

const addproduct=(req,res)=>{
    let file =req.files.image;
    const {name}= req.files.image;
    req.body.image=name;
    console.log(req.body)
    var data=req.body;
    file.mv('public/images/products/'+ name,(err)=>{
        if(err){
            console.log(err)
        }else{
            let qry='insert into product set ?'
            console.log('hello')
            con.query(qry,data,(err,result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log(result)
                    res.redirect('/admin/addproduct')
                }
            })
        }
    })
}
   



const getdologin=((req,res)=>{

    let username="admin"
    let password='admin'
    console.log(req.body)
    if(req.body.username== username && password== password){
        console.log('login succesfully')
          res.redirect('/admin/home')
    }else{
        console.log('login error')
        res.render('admin/login')
    }

})



module.exports={getadminloginpage,getdologin,adminhome,getadminproductpage,addproduct}