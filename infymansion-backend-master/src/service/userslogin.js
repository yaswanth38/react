const userDB = require("../model/userslogin");

const userService = {};

//login a user
userService.login = async (email, userPassword) => {
  //call userDB functions here to interactive with DB
    console.log("from service");
    let rq= await userDB.userLogin(email,userPassword);
    if(rq){
      console.log("user login successfully");
      return rq;
    }
    
  
};
userService.explore = async()=>{
  
  let conn = await userDB.getexplore();
  if(conn!=null){
    return conn;
  }else{
    let err = new Error("No Property to show");
    err.status = 502;
    throw err;
  }
};

userService.viewDetails = async(id)=>{
  let details = await userDB.getDetails(id);
  if(details!=null){
    return details;
  }else{
    let err = new Error("No Property to show");
    err.status = 502;
    throw err;
  }
}
userService.insertvisit = async(data)=>{
  let insbook = await userDB.insertvis(data);
  if(insbook){
      return insbook;
  }else{
    let err = new Error("Can't register");
    err.status = 502;
    throw err;
  } 
};

userService.getbook = async()=>{
  let data = await userDB.getBooking();
  if(data!=null){
    return data;
  }else{
    let err = new Error("Date is already booked");
    err.status = 502;
    throw err;
  }
}

userService.adduser = async(data)=>{
  let insuser = await userDB.insertuser(data);
  if(insuser){
      return insuser;
  }else{
    let err = new Error("Can't register");
    err.status = 502;
    throw err;
  } 
}
userService.searchProp = async(search)=>{
  let sear = await userDB.getexplore();
  let filterData = sear.filter((dta)=>{
    const pattern = new RegExp(search,"gi")
    if(pattern.test(dta.address)){
      return true;
    }else{
      return false;
    }
  })
  if(filterData.length!=0){
    return filterData;
  }else{
    return null;
  }
}
userService.getemail = async()=>{
  let gtemail = await userDB.getallemail();
  if(gtemail){
      return gtemail;
  }else{
    let err = new Error("Date is alreday booked");
    err.status = 502;
    throw err;
  }
}


module.exports = userService;
