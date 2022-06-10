const ex = module.exports;
const Bookings = require('../data-models/booking')
const dbop = require('booking-mongo-db');
const rp = require('request-promise');
const moment = require('moment');
const config = require('../config/config.json');



ex.bookRooms = async(param)=>{
    if(!param.firstName  || !param.lastName || !param.email || !param.numberOfPeople || !param.fromDate || !param.toDate)
    throw "Invalid Param";

    let dateDiff = moment(param.toDate).diff(moment(param.fromDate), 'days',true);
    console.log(dateDiff);
    if(param.numberOfPeople > 3)
    throw "only 3 people allowed per booking"
    
    if(dateDiff > 3)
    throw "only days allowed per booking"
    try{
        let option ={
            uri: 'http://localhost:3001/api/rooms/getPSRoom/',
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };
        
        let rooms = await rp(option)
        console.log("room", rooms.data)
        if(!rooms){
            throw "Sorry, All rooms are booked!!"
        }
        else{
            let booking = new Bookings({
                firstName : param.firstName,
                lastName : param.lastName,
                email : param.email,
                numberOfPeople :param.numberOfPeople, 
                fromDate: param.fromDate,
                toDate: param.toDate,
                room: rooms._id
            });
            let booked = await dbop.save(booking);
            console.log("booked",booked);
            let cancelLink = config.bookingCancelUrl;
            
            cancelLink = cancelLink.toString().replace(/%host%/, config.host);
            cancelLink = cancelLink.toString().replace(/%bookingId%/, booked._id.toString());
            let listLink = config.bookingViewUrl;
            listLink = listLink.toString().replace(/%host%/, config.host);
            listLink = listLink.toString().replace(/%bookingId%/, booked._id.toString());
            option = {
                method: 'PATCH',
                uri: 'http://localhost:3001/api/rooms/',
            headers: {
                'User-Agent': 'Request-Promise'
            },
            body:{_id:rooms._id, update:{bookingId:booked._id, roomStatus:"0"}},
            json: true // Automatically parses the JSON string in the response
            }
            await rp(option)
            return {cancelLink, listLink}
        }

    }catch(err){
        throw err;
    }
}

ex.listBooking = async(id)=>{
    if(!id)
    throw "invalid params"
    try{
        let booking = await dbop.findOne(Bookings, {_id:id})
        if(!booking)
        throw "invalid booking id"
        else return booking
    }catch(err){
        throw err;
    }
}

ex.cancleBooking = async(id)=>{
    if(!id)
    throw "invalid params"
    try{
        let booking = await dbop.findOne(Bookings, {_id:id})
        if(!booking)
        throw "invalid booking id";
        option = {
            method: 'PATCH',
            uri: 'http://localhost:3001/api/rooms/',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        body:{_id:booking.room, update:{bookingId:null, roomStatus:"F"}},
        json: true // Automatically parses the JSON string in the response
        }
        await rp(option)
        await dbop.deleteOne(Bookings, {_id:id})
        return "Booking cancelled"
    }
    catch(err){
        throw err;
    }
}
