const Razorpay = require('../payment/razor');
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
                let id=user.id
                let cartqry='select count (*) as cartnumber from cart where userid = ?'
                con.query(cartqry,[id],(err,row)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(row[0].cartnumber,'cart....')
                        let cart=row[0].cartnumber
                        res.render('index',{result,user,cart});

                    }
                })
                
            }else{
                
                res.render('index',{result});
            //  console.log(result)
            }

        }
    })
    
}
const single=(req,res)=>{
    let qry='select * from product where id = ?'
    let productid=req.params.pid;
    con.query(qry,[productid],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            let product=result[0];
            let user=req.session.user;
            res.render('user/single',{product,user})

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
    res.redirect('/')
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


const addtocart=(req,res)=>{
    let productid=req.params.pid;
    console.log(productid)
    let userid=req.session.user.id;

    console.log(userid)
     let qry1='select * from cart where userid = ? and productid = ?'
     con.query(qry1,[userid,productid],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length>0)
            {
                var qty=result[0].qty;
                var cartid=result[0].id;
                qty=parseInt(qty)+1 ;
                let qry2='update cart set qty = ? where id = ?'
                con.query(qry2,[qty,cartid],(err,row)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.redirect('/')
                    }
                })
            }
            else{
                let qry3='insert into cart set ?'
                let data={
                    productid,
                    userid
                }
                con.query(qry3,data,(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.redirect('/')
                    }
                })
            }

        }
    
     })

}
const checkouts= (req,res)=>{
    let pid=req.params.id;
    let price=req.params.price;
    console.log(pid,price)
    var options ={
        amount:price,
        currency:'INR',
        receipt:"order_rcptid_11"
    };
    Razorpay.orders.create(options,(err,order)=>{
        if(err){
            console.log(err)
        }else{
            console.log(order)
            res.render('user/checkout',{order})
        }
    })
    
}
const verify=async(req,res)=>{
    console.log('verifictaion route worky.....')
    console.log(req.body)
    let data=req.body;
    var crypto = require('crypto')
    var order_id = data['response[razorpay_order_id]']
    var payment_id = data[ 'response[razorpay_payment_id]']
    const razorpay_signature = data[ 'response[razorpay_signature]']
    const key_secret = "XzbmNCBdNu4USFeq5XkLDycm";
    let hmac = crypto.createHmac('sha256', key_secret); 
    await hmac.update(order_id + "|" + payment_id);
    const generated_signature = hmac.digest('hex');
    if(razorpay_signature===generated_signature){
        console.log('payment verified')

    }else{
        console.log('payment failed')
    }
}




module.exports ={getHomePage,checkouts,getLoginPage,getRegisterPage,dologin,doRegister,getcartpage,getlogoutpage,addtocart,single,verify
}