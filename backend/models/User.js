import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
        name: {
            type: String,
            requried: true,
        },
        email: {
            type: String,
            requried: true,
            unique: true,
        },
        password: {
            type: String,
            requried: true,
            minLength: 6,
        },
        // Events array as per the user
        events: [
            {
                type: mongoose.Types.ObjectId, 
                ref: "Event",
                requried: true
            }
        ],
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema)