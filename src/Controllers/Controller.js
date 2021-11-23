const { UserSchema, TicketSchema } = require("../models/Model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = mongoose.model('UserModel', UserSchema);
const TicketModel = mongoose.model('TicketModel', TicketSchema);

// Ticket Database Saving
async function saveTicketToDb(req, res) {
    try {
        let ticketObj = req.body;
        ticketObj["userId"] = req.session.user._id;
        const data = await TicketModel.create(ticketObj);
        res.json(JSON.stringify(data));
    } catch(err) {
        console.log(err);
    }
}

// User login and Signup
async function userSignup(req, res) {
    let userObj = req.body;
    const data = await UserModel.create(userObj);
    req.session.user = data;
    res.redirect('/homepage');
}

async function userLogin(req, res){
    let user = await UserModel.findOne({email: req.body.email});
    if(user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if(match){
            req.session.user = user;
            res.redirect('/homepage');
        } else {
            res.json({error: 'Invalid password'});
        }
    }
}

async function userLogout(req, res) {
    req.session.user = null;
    res.redirect('/homepage');
}

// Profile 

async function getAllTicketsForUser(user) {
    const tickets = await TicketModel.find({userId: user._id}, null, {sort: {date: 1}}, function(err, model) {
        if(err) {
            console.log(err);
        } else {
            // console.log(model);
        }
    }).clone();
    return tickets;
}

async function filterUpcomingTickets(tickets) {
    return tickets.filter((ticket) => {
        return Date.parse(ticket.date) > Date.now();
    });
}

async function filterExpiredTickets(tickets) {
    return tickets.filter((ticket) => {
        return Date.parse(ticket.date) <= Date.now();
    });
}

async function handleGetReqProfile(req, res) {
    if(req.session.user) {
        let tickets = await getAllTicketsForUser(req.session.user);
        let upcomingTickets = await filterUpcomingTickets(tickets);
        let expiredTickets = await filterExpiredTickets(tickets);
        res.render('profile', {user: req.session.user, upcomingTickets: upcomingTickets, expiredTickets: expiredTickets});
    } else {
        res.redirect('/homepage');
    }
}


async function handleUpdateProfile(req, res) {
    const profileData = req.session.user;
    if(req.body.name) profileData["name"] = req.body.name;
    if(req.body.birthDay) profileData["birthDay"] = req.body.birthDay;
    if(req.body.Gender) profileData["Gender"] = req.body.Gender;
    if(req.body.maritalStatus) profileData["maritalStatus"] = req.body.maritalStatus;

    req.session.user = profileData;
    const user = UserModel.findByIdAndUpdate(req.session.user._id, profileData, function(err, model) {
        if(err) {
            // console.log("Error = " + err);
        } else {
            // console.log("Modal = " + model);
        }
    });
    res.redirect("/profile");
}

async function handleUpdatePassword(req, res) {
    let profileData = req.session.user;

    if(req.body.newPassword == req.body.confirmPassword) {
        const match = await bcrypt.compare(req.body.oldPassword, req.session.user.password);
        if(match) {
            let salt = await bcrypt.genSalt();
            let newpass = await bcrypt.hash(req.body.newPassword, salt);
            profileData.password = newpass;

            async () => await UserModel.findByIdAndUpdate(req.session.user._id, profileData, function(err, model) {
                if(err) {
                    console.log(err + " err");
                } else {
                    console.log(model + " model");
                }
            });
        } else {
            req.session.user.passwordmatcherror = "";
            req.session.user["wrongoldpassword"] = "Enter Correct Password";
            console.log(req.session.user);
            res.redirect('/profile');
        }
    } else {
        req.session.user.wrongoldpassword = "";
        req.session.user["passwordmatcherror"] = "Your password and confirm password do not match";
        res.redirect('/profile');
    }
    
}

module.exports = {
    userSignup, userLogin, userLogout, saveTicketToDb, handleGetReqProfile, handleUpdateProfile, handleUpdatePassword
}