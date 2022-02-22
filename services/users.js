const { Userdetailed1 } = require("../model/DbSchema");
const { bookingdetailed1 } = require("../model/DbSchema");

exports.checkslotavailability = async (req, res) => {
    try {
        let bookeddate = await bookingdetailed1.findOne(
            {
                $and: [
                    { bookingdate: req.params.date },
                    { bookingstarttime: { $lt: req.params.bookedtime } },
                    { bookingendtime: { $gt: req.params.maxtime } }
                ]
            }
        )
        console.log(bookeddate);
        if (!bookeddate) {
            return res.send({ message: "Slot Available" });
        } else {
            return res.status(200).send({ message: "Date and Time Slot already booked" });
        }
    } catch (err) {
        return res.status(500).json({ "status": "fail", "message": "Something went wrong" });
    }
}

exports.checksbookingdetails = async (req, res) => {
    try {
        let bookeddata = await bookingdetailed1.findOne({ transid: req.params.transid })
        if (!bookeddata) {
            return res.status(200).send({ message: "Booking details not available" });
        } else {
            return res.send(bookeddata);
        }
    } catch (err) {
        return res.status(500).json({ "status": "fail", "message": "Something went wrong" });
    }
}

exports.deletebookingdetails = async (req, res) => {
    try {
        let bookeddata1 = await bookingdetailed1.findOneAndUpdate({ transid: req.params.transid }, { $set: { bookingstatus: "Cancelled" } })
        if (!bookeddata1) {
            return res.status(400).send({ message: " Cannot find booking id " + req.params.transid });
        } else {
            return res.send({ message: "Booking deleted succesfully" });
        }
    } catch (err) {
        return res.status(500).json({ "status": "fail", "message": "Something went wrong" });
    }
}

exports.updateuserdetails = async (req, res) => {
    console.log(req.body);
    try {
        let bookeddata1 = await bookingdetailed1.findOneAndUpdate(
            { 'transid': req.params.transid },
            {
                $set: {
                    username: req.body.username,
                    custname: req.body.custname,
                    bookingdate: req.body.bookingdate,
                    bookingserivce: req.body.bookingservice,
                    bookingstarttime: req.body.bookingstarttime,
                    vehiclemodel: req.body.vehiclemodel,
                    phoneno: req.body.phoneno,
                    email: req.body.email
                }
            }
        )
        if (!bookeddata1) {
            return res.status(400).send({ message: " Cannot find booking id " + req.params.transid });
        } else {
            return res.send({ message: "Booking details updated succesfully" });
        }
    } catch (err) {
        return res.status(500).json({ "status": "fail", "message": "Something went wrong" });
    }
}

exports.createuserdetails = async (req, res) => {
    console.log(req.body);
    const bookingdetails = new bookingdetailed1(
        {
            username: req.body.username,
            custname: req.body.custname,
            bookingdate: req.body.bookingdate,
            bookingstarttime: req.body.bookingstarttime,
            bookingendtime: req.body.bookingendtime,
            vehiclemodel: req.body.vehiclemodel,
            phoneno: req.body.phoneno,
            email: req.body.email,
            bookingservice: req.body.bookingservice
        }
    )
    try {
        let bookid = await bookingdetailed1.find().count() + 1;
        bookingdetails.transid = 'T' + String(bookid);
        console.log(bookid);
        let slotid = await bookingdetailed1.find({ "bookingdate": req.body.bookingdate }).count() + 1;
        bookingdetails.slotnumber = Number(slotid);
        bookingdetails.bookingstatus = 'confirmed';
        await bookingdetails.save();
        return res.send({
            message: "Booking Successfull!!!... Your Transactionid is " + bookingdetails.transid
                + "and slot number " + bookingdetails.slotnumber + " for date " + req.body.bookingdate
        });
    }
    catch (err) { res.send(err) }
}


exports.checklogindetails = async (req, res) => {
    try {
        let checkuserdetails = await Userdetailed1.findOne({ username: req.params.username, password: req.params.password })
        if (!checkuserdetails) {
            return res.send({ status: "failure" ,message: "Login failed" });
        } else {
            return res.send({ status: "success", message: "Welcome" });
        }
    }
    catch (err) { res.send(err) }
}


exports.registeruser = async (req, res) => {
    const userdetails = new Userdetailed1(
        {
            username: req.params.username,
            custname: req.params.custname,
            password: req.params.password
        }
    )
    try {
        let olduserdetails = await Userdetailed1.findOne({ username: req.params.username })
        if (!olduserdetails) {
            await userdetails.save()
            return res.send({ message: "Customer Registered successfully" });
        } else {
            return res.send({ message: "User name already registered!! Either Login or Choose a different username" });
        }
    }
    catch (err) { res.send(err) }
}