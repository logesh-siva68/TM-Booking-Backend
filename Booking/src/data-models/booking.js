const mongoose = require('mongoose');

const bookingsSchema = mongoose.Schema(
    {
        firstName : {type: String, required:true},
        lastName : {type: String, required:true},
        email : {type: String, required:true},
        numberOfPeople : {type: Number, required:true},
        fromDate: {type:Date, require:true},
        toDate: {type:Date, require:true},
        room: { type: mongoose.Schema.Types.ObjectId, ref: "Rooms", required: true }
    },
    { timestamps: true }
)

module.exports =  mongoose.model("Bookings", bookingsSchema);