const express = require('express');
const app = express();
const employeeRoute = express.Router();



const users = require("../services/users.js");

//Check Slot details
employeeRoute.get("/slots/:date/:bookedtime/:maxtime", users.checkslotavailability);

//Check User Booking details
employeeRoute.get("/viewuserdetails/:transid", users.checksbookingdetails);

//Delete particular user details
employeeRoute.put("/deleteuserdetails/:transid", users.deletebookingdetails);

//Update particular user details
employeeRoute.put("/updateuserdetails/:transid", users.updateuserdetails);

//Create particular user details
employeeRoute.post("/createuserdetails/", users.createuserdetails);

//Register user details
employeeRoute.post("/registerusers/:username/:custname/:password", users.registeruser);

//Check user login
employeeRoute.get("/checklogindetails/:username/:password", users.checklogindetails);

module.exports = employeeRoute;
