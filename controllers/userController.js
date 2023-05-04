var con=require('../config/config');

const getHomePage=(req,res)=>{
    let qry='select * from product'
    con.query(qry,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            if(req.session.user){
                let user=req.session.user;
                console.log(user,"hellooo")
                res.render('index',{user,result})
            }else{
            res.render('index',{result});
            }

        }
    })
    
}

const getLoginPage=(req,res)=>{
    res.render('user/login');

}
const getRegisterPage=(req,res)=>{
    res.render('user/registers');
}

const getcartpage=((req,res)=>{
    let user=req.session.user
    res.render('user/myorder',{user})
})


const getlogoutpage=((req,res)=>{
    req.session.destroy()
    res.render('index')
})




const doRegister=(req,res)=>{
    
    console.log(req.body);
    let qry="insert into user set ?"
    con.query(qry,req.body,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log('inserted sucessfully')
            res.redirect('/login')
        }

    })
}
const dologin=(req,res)=>{
    console.log(req.body)
    let {username}=req.body;
    let {password}=req.body;
    let qry='select * from user where email= ? and password= ?'
    con.query(qry,[username,password],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
                console.log(result)
                if(result.length>0){
                    console.log('login succesfully')
                    req.session.user=result[0];
                    console.log(req.session.user,'from session data')
                    res.redirect('/')
                }
                else{
                    console.log('login error')
                    res.redirect('/login')
                }
                
        }
    })
 
}

module.exports ={getHomePage,getLoginPage,getRegisterPage,dologin,doRegister,getcartpage,getlogoutpage
}