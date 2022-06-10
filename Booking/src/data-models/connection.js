const mongoose = require('mongoose');
const ex = module.exports;
const url = require('../config/config.json').dburl;

ex.connectMongo = async()=>{
    try{
        console.log("try to handshake with mongo")
        await mongoose.connect(url)
        console.log("conneted to mongo")
    }
    catch(err){throw err;}
}