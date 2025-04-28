const express = require("express")
var router = express.Router()
const path = require("path")


router.get('/login',(req, res)=>{

     // res.sendFile(path.join(__dirname,"..","public","login.html"))
    res.render('pages/login')
})


router.post("/login", (req, res)=>{

    let uname = req.body.uname
    let password = req.body.password

    if(uname =="admin" && password=="admin1"){
        req.session.isuser_valid = true
        req.session.username = uname
        res.redirect('/users/profile')
    }else{
        req.session.isuser_valid = false
        res.redirect('/auth/login')
    }

})

router.get('/logout',(req,res)=>{

    if(req.session.isuser_valid){
        req.session.destroy()
        req.redirect("/auth/log")
    }else {
        req.redirect("/auth/log")
    }
})

module.exports = router