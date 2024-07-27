const express = require("express");
const router = express.Router();
const userservice = require("../service/userslogin");
const bookavisit = require("../model/Bookvisit");
const regiObje = require("../model/Register");
const userService = require("../service/userslogin");

//router to login
router.post("/login", function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  userservice
    .login(email, password)
    .then(function (userDetails) {
      res.status(500);
      res.json(userDetails);
    })
    .catch((err) => next(err));
});

router.get("/explore",async(req,res,next)=>{
  try{
    let exp = await userservice.explore();
    res.json(exp);
  }
  catch(error){
    next(error);
  }
});

router.get("/explore/:propertyId",async(req,res,next)=>{
  try{
    let id = req.params.propertyId
    let data = await userservice.viewDetails(id);
    res.json(data);
  }
  catch(error){
    next(error);
  }
})
//create a route for rigister with url /register
router.get("/home", (req, res) => {
  res.send("Welcome to the home page!");
});

router.post("/register",async(req,res,next)=>{
  try{
    let data = req.body;
    let regObj = new regiObje(data);
    let exp = await userservice.adduser(regObj);
    res.status(500)
    res.json(exp);
  }catch(error){
    next(error);
  }
})

router.post("/bookings",async(req,res,next)=>{
  try{
    let data = req.body;
    let bookObj = new bookavisit(data);
    let bookvisit  = await userservice.insertvisit(bookObj);
    res.status(200)
    res.json(bookvisit);
  }catch(error){
    next(error);
  }
})

router.get("/bookings",async(req,res,next)=>{
  try{
    let book = await userservice.getbook();
    res.json(book);
  }
  catch(error){
    next(error);
  }
})

router.get("/userDB",async(req,res,next)=>{
  let email = req.query.emailId;
  let pwd = req.query.password;
  try{
    let check = await userservice.login(email,pwd);
    res.status(200)
    res.json(check);
  }catch(error){
    next(error);
  }
})

router.get('/exploresearch', async (req,res,next)=>{
  try{
    let search = req.query.searchTerm;
    let searchData = await userService.searchProp(search);
    if(searchData){
      res.status(200)
      res.json({"data": searchData, "message":""})
    }else{
      res.status(201)
      res.json({"data":[],"message":search})
    }
  }catch(err){
    next(err)
  }
})

router.get("/getemails",async(req,res,next)=>{
  try{
    let chk = await userservice.getemail();
    res.json(chk);
  }catch(error){
    next(error);
  }
})
module.exports = router;
