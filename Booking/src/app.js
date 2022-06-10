const express = require("express");
const cors = require('cors');

const port = process.env.port || require('./config/config.json').port;

const app = express();

const mongoConnection  = require('./data-models/connection');

(async() => {
    try{
        await mongoConnection.connectMongo();
        console.log("mogo connected");
    }catch(err){
        console.log("err------>",err);
        throw err;
    }
})();


 
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({extended:false}))

app.use(cors());

app.use('/api/booking', require('./routes/booking'))



app.use((req,res)=>{
    
    res.status(404).json({"message":"Sorry, bad request"})
})

app.listen(port,()=> console.log("app running on ", port));