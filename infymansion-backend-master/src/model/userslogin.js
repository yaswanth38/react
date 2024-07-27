const connection = require("../utilities/connections");

const usersDB = {};

/**
 * Perform the crud operations here
 */
usersDB.getexplore=async()=>{
    console.log("from model");
    let model = await connection.getPropertyCollection();
    let fetchdata = await model.find()
    if(fetchdata){
        return fetchdata;
    }else{
        return null;
    }
}
usersDB.getDetails=async(id)=>{
    let model = await connection.getPropertyCollection();
    let getdata = await model.findOne({ propertyId: id })
    if(getdata){
        return getdata
    }else{
        return null;
    }
}
usersDB.insertvis = async(insdata)=>{
    let model = await connection.getbookingCollection();
    let inserteddata = await model.create(insdata);
    if(inserteddata){
        return inserteddata;
    }else{
        return null;
    }
}

usersDB.getBooking = async()=>{
    let model = await connection.getbookingCollection();
    let fetchdata = await model.find({},{_id:0});
    if(fetchdata){
        return fetchdata;
    }else{
        return null;
    }
}

usersDB.insertuser= async(userdata)=>{
    let model = await connection.getUserCollection();
    let insertdata = await model.create(userdata);
    if(insertdata){
        return insertdata;
    }else{
        return null;
    }
}

usersDB.userLogin = async(uemail,upass)=>{
    console.log("from model");

    let model = await connection.getUserCollection();
    let data=await model.find({$and:[{"emailId":uemail},{"password":upass}]},{_id:0});
    console.log(data);
    if(data){
        return data;
    }
    else{
        let err=new Error("no data in in user collection");
        err.status=506;
        throw err;
    }
}

usersDB.getallemail = async()=>{
    let model = await connection.getUserCollection();
    let data = await model.find({},{_id:0});
    if(data){
        return data;
    }else{
        return null;
    }
}
module.exports = usersDB;
