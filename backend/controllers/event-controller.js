import mongoose from "mongoose";
import Event from "../models/Event.js";
import User from "../models/User.js";


///// GET ALL EVENTS
export const getAllEvents = async (req,res,next) => {
    let events;
    try {
        events = await Event.find();
    } catch (err) {
        console.log(err)
    }
    if(!events){
        return res.status(404).json({
            message: "No events found"
        })
    }
    return res.status(200).json({events})
}

///// POST CREATE EVENT
export const addEvent = async (req,res,next) => {
    const {title, description, image, user} = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({
            message: "Unable to find the user by give Id"
        })
    }

    const event = new Event({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await event.save({session});
        existingUser.events.push(event)
        await existingUser.save({session})
        await session.commitTransaction();
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err
        })
    }
    return res.status(200).json({event})
}

///// PUT UPDATE EVENT
export const updateEvent = async (req,res,next) => {
    const {title, description} = req.body;
    const eventId = req.params.id;
    
    let event;
    try{
        event = await Event.findByIdAndUpdate(eventId, {
            title,
            description
        })
    } catch(err){
        return console.log(err)
    }
    if(!event){
        return res.status(500).json({
            message: "Unable to update the event"
        })
    }
    return res.status(200).json({event})
}

///// GET EVENT
export const getById = async (req,res,next) => {
    const id = req.params.id;
    let event;
    try {
        event = await Event.findById(id)
    } catch (err) {
        return console.log(err)
    }
    if(!event){
        return res.status(404).json({
            message: "No event found"
        })
    }
    return res.status(200).json({event})
}

///// DELETE EVENT
export const deleteEvent = async (req,res,next) => {
    const id = req.params.id;

    let event;
    try {
        event = await Event.findByIdAndDelete(id).populate('user');
        await event.user.events.pull(event);
        await event.user.save();
    } catch (err) {
        return console.log(err)
    }
    if(!event){
        return res.status(500).json({
            message: "Unable to delete event"
        })
    }
    return res.status(200).json({
        message: "Event deleted successfully"
    })
} 

///// GET USER EVENT
export const getByUserId = async (req,res,next) => {
    const userId = req.params.id;
    let userEvents;
    try {
        userEvents = await User.findById(userId).populate("events");
    } catch (err) {
        return console.log(err)
    }
    if(!userEvents){
        return res.status(404).json({
            message: "No event found"
        })
    }
    return res.status(200).json({
        events:userEvents
    })   
}