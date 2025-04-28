var express = require("express")
var router = express.Router()
var path = require("path")

// router.get("/login",(req,res)=>{
//
//         res.sendFile(path.join(__dirname,"..","public","login.html"))
//
// })
//
// router.post("/login", (req,res)=>{
//
//     // res.send(JSON.stringify({"STATUS":200,"msg":"SUCCESS"}))
//     let username = req.body.uname
//     let password = req.body.password
//
//     if(username == "admin" && password=="admin"){
//         res.send(JSON.stringify({"STATUS":200,"msg":"SUCCESS from USER ROUTER"}))
//     }else{
//         res.redirect("/user/login")
//     }
// })

router.get('/profile',(req, res)=>{

    if(req.session.isuser_valid){

        res.send('<h2>Welcome '+ req.session.username+'</h2><br/><a href="/auth/logout">Logout</a>')
    }
    else{
        res.redirect("/auth/login")
    }
})

module.exports = router