const mongoose = require("mongoose");
/*
data.connectiom.host gives the host on which our connection is
DB_URI is a variable declared in config.env
*/
 const connectDatabase =( )=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then(
        (data)=>{
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        }).catch((err)=>{
            console.log(err)
        })
} 

module.exports = connectDatabase