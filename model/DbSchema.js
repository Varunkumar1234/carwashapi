const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let bookingdetail = new Schema({
    transid: {
        type: String
    }, username: {
        type: String
    }, custname: {
        type: String
    }, bookingdate: {
        type: String
    }, bookingstarttime: {
        type: String
    }, bookingendtime: {
        type: Number
    }, bookingstatus: {
        type: String
    }, vehiclemodel: {
        type: String
    }, slotnumber: {
        type: Number
    }, phoneno: {
        type: Number
    }, email: {
        type: String
    }, bookingservice: {
        type: String
    }
})



// Define collection and schema
let userdetail = new Schema({
    username: {
        type: String
    }, custname: {
        type: String
    }, password: {
        type: String
    }
})

const userSchema = mongoose.model('userdetailed', userdetail);
const bookingdetailSchema = mongoose.model('bookingdetailed', bookingdetail);

module.exports = { Userdetailed1: userSchema, bookingdetailed1: bookingdetailSchema }

