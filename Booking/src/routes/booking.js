const express = require('express');
const router = express.Router();
const lib = require('../library/booking');

router.post('/', async(req,res)=>{
    try{
        res.status(200).json({data:await lib.bookRooms(req.body)});
    }
    catch(err){
        console.log("err------>",err);
        res.status(400).json({"message":err});
        
    }
})
router.get('/list/:id', async(req,res)=>{
    try{
        res.status(200).json({data:await lib.listBooking(req.params.id)});
    }
    catch(err){
        res.status(400).json({"message":err});
        
    }
})

router.delete('/cancel/:id', async(req,res)=>{
    try{
        res.status(200).json({data:await lib.cancleBooking(req.params.id)});
    }
    catch(err){
        res.status(400).json({"message":err});
        
    }
})

module.exports = router;