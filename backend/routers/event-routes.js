import express from "express"
import { addEvent, deleteEvent, getAllEvents, getById, getByUserId, updateEvent } from "../controllers/event-controller.js";

const eventRouter = express.Router();

///// GET ALL EVENTS
eventRouter.get("/", getAllEvents)

///// POST CREATE EVENT
eventRouter.post("/add", addEvent)

///// PUT UPDATE EVENT
eventRouter.put("/update/:id", updateEvent)

///// GET EVENT
eventRouter.get("/:id", getById)

///// DELETE EVENT
eventRouter.delete("/:id", deleteEvent)

///// GET USER EVENT
eventRouter.get("/user/:id", getByUserId)

export default eventRouter;