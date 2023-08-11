require("dotenv").config();
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const cookieParser = require('cookie-parser');
app.use(express.json())
app.use(cors())
app.use(cookieParser());

app.use("/api/user",require("./routes/user"))
app.use("/api/blog",require("./routes/blog"))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    app.listen(process.env.PORT,"localhost",()=>{
        console.log("Database Connected SuccessFully")
        console.log(`Server Started At ${process.env.PORT}`)
    })
}).catch((err)=>console.log(err))