const express = require("express");
const bodyParser = require("body-parser");
const create = require("./model/Setupdb")
const myErrorLogger = require("./utilities/ErrorLogger");
const myRequestLogger = require("./utilities/RequestLogger");
const userRouter = require("./routes/userRouter");
const cors = require("cors");

const app = express();

// var corsobj={
// origin:"http://localhost:3000"
// }
// app.use(cors(corsobj));
// app.get("/dd",function(req,res,next){
//     console.log("fkvbbv");
//     res.send({"message":"hhihihih"});
// })
app.use(cors());
app.use(bodyParser.json());
app.use(myRequestLogger);
app.use("/", userRouter);
app.use(myErrorLogger);

app.get('/setupdb', async (req, res, next) => {
    try{
        let data = await create.setupDb();
        res.send(data);
    }catch ( error ){
        next(error);
    }
})

app.listen(5500);
console.log("Server listening in port 5500 ");
// console.log(data.setupDb)
module.exports = app;

// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//     res.send({
//         message:"Server is running successfuly!"
//     });
// });
// app.listen(port, () => console.log(`listening on http://localhost:${port}`));

