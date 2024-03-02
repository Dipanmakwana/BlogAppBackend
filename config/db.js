const mongoose = require("mongoose");

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("Database Connected.");
    } catch (error) {
        console.log("Mongo connection error : ",error);
    }
}

module.exports = connect;