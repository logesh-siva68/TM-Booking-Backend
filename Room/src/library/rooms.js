const Rooms = require('../data-models/rooms');
const dbop = require('booking-mongo-db'); // Npm Package  / library
const ex = module.exports;

//add room
ex.createRoom = async({roomNo, roomType})=>{
    try{
        let room = new Rooms({
            roomNumber : roomNo,
            roomType : roomType
        });
        let createdRoom = await dbop.save(room);
        console.log(createdRoom)
        return createdRoom;
    }catch(err){console.log(err)}
}

//delete room
ex.deletedRoom = async(id)=>{
    try{
        let deletedRoom = await dbop.deleteOne(Rooms,{_id:id})
        return deletedRoom;
    }catch(err){console.log(err)}
}

ex.getPsRoom = async()=>{
    try{
        let psRoom = await dbop.findOne(Rooms, {"roomType" :"PS", "bookingId":null,  "roomStatus" : "F"})
        return psRoom;
    }catch(err){console.log(err)}
}

ex.updateRoom = async(params)=>{
    try{
        let conditons = {_id: params._id}
        let updates = params.update
        return await dbop.update(Rooms, conditons, updates)
    }catch(err){throw err}
}