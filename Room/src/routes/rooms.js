const express = require('express');
const router = express.Router();
const lib = require('../library/rooms');


//Add a room
router.post('/', async(req,res)=>{
    try{
        let createdRoom = await lib.createRoom(req.body);
        res.status(200).json({data:createdRoom});
    }catch(err){
        // console.log("-------->",err);
        res.status(400).json({"message":err})
    }
})



// Delete a Room
router.delete('/:id',async(req,res)=>{
    try{
        let deletedRooms = await lib.deletedRoom(req.params.id);
        res.status(200).json({data:deletedRooms})
    }catch(err){
        // console.log(err);
        res.status(400).json({"message":err})
    }
})

router.get('/getPSRoom', async(req,res)=>{
    try{
        let PSRooms = await lib.getPsRoom();
        res.status(200).json({data:PSRooms})
    }catch(err){
        console.log(err);
        res.status(400).json({"message":err})
    }
})

router.patch('/', async(req,res)=>{
    try{
        let updateRoom = await lib.updateRoom(req.body);
        res.status(200).json({data:updateRoom})
    }catch(err){
        console.log(err)
        res.status(400).json({"message":err})
    }
})


module.exports = router;