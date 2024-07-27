const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
Mongoose.set('useUnifiedTopology',true);
Mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/infyMansion";

let userSchema = Schema(
  {
    name: String,
    userId: String,
    emailId: String,
    mobNo: Number,
    password: String,
    bookings: [String],
  },
  { collection: "userDb" }
);

let propertySchema = Schema(
  {
      id: Number,
      propertyId: String,
      sellerId: String,
      visitors: [Number],
      pincode: Number,
      propertyType: String,
      propertyOwnership: String,
      buildingType: String,
      noOfBathrooms: Number,
      noOfBedrooms: Number,
      noOfBalconies: Number,
      furnishing: String,
      availability: String,
      lifts: Boolean,
      ac: Boolean,
      heater: Boolean,
      maintenenceStaff: Boolean,
      visitorParking: Boolean,
      IntercomFacility: Boolean,
      wifi: Boolean,
      fireAlarm: Boolean,
      WaterPurifier: Boolean,
      PowerBackup: Boolean,
      WaterSupplyFor24Hours: Boolean,
      CloseToSchool: Boolean,
      CloseToHospital: Boolean,
      CloseToRailwayStation: Boolean,
      CloseToBusStand: Boolean,
      CloseToAirport: Boolean,
      CloseToBank: Boolean,
      CloseToPark: Boolean,
      status: String,
      address: String,
      price: Number,
      Advance: Number,
      transactionType: String,
      ageOfProperty: String,
      availabilityBy: String,
      totalFloors: Number,
      PropertyFloor: Number,
      propertyArea: Number,
      poojaRoom: Boolean,
      servantRoonm: Boolean,
      noofCoveredParking: Number,
      noOfOpenParking: Number,
      description: String,
      imageUrls: String,
      extras: String
    
  },
  { collection: "propertyDb" }
);

let bookingSchema = Schema(
  {
    propertyId: String,
    name: String,
    mobNo: String,
    emailId: String,
    pancardNo: String,
    visitingDate: String,
    sellerId: String,
    id: Number
  },
  {collection:"bookings"}
);

let wishlistSchema = Schema(
  {
    id: Number,
    properties: [String]
  },
  { collection:"wishlist"}
)

let collection = {};

collection.getUserCollection = async () => {
  try {
    const database = await Mongoose.connect(url, { useNewUrlParser: true });
    return database.model("userDb", userSchema);
  } catch (error) {
    let err = new Error("Could not connect to Database");
    err.status = 500;
    throw err;
  }
};

collection.getPropertyCollection = async () => {
  try {
   let dbConnection= await Mongoose.connect(url, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
    return dbConnection.model("propertyDb", propertySchema);
  } catch (error) {
    let err = new Error("Could not connect to database")
    err.status = 500
    throw err;
  }
};

collection.getbookingCollection = async () =>{
  try {
    let dbConnection= await Mongoose.connect(url, 
     { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
     return dbConnection.model("bookings", bookingSchema);
   } catch (error) {
     let err = new Error("Could not connect to database")
     err.status = 500
     throw err;
 }
}

collection.getWishlist = async () =>{
  try{
    let dbConnection= await Mongoose.connect(url, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
    return dbConnection.model("wishlist", wishlistSchema);
  } catch(error){
    let err = new Error("Could not connect to database")
    err.status = 500
    throw err;
  }
}

module.exports = collection;
