const mongoose = require('mongoose');

const RoomsSchema = mongoose.Schema(
    {
        roomNumber : {type : Number, required : true},
        roomStatus : {type : String, default :"F"},
        roomType : {type : String, required : true},
        bookingId : {type : String, default: null}
    },
    { timestamps: true }
)

module.exports =  mongoose.model("Rooms", RoomsSchema);