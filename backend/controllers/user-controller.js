import User from '../models/User.js';
import bcrypt from 'bcryptjs';

///// GET ALL USERS
export const getAllUser = async(req,res,next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if(!users){
        return res.status(404).json({
            message: "No user found"
        });
    }
    return res.status(200).json({users});
}

///// POST CREATE USER
export const signup = async(req,res,next) => {
     const  {name, email, password} = req.body;

     let existingUser;
     try {
        existingUser = await User.findOne({email});
     } catch (err) {
        return console.log(err)
     }
     if(existingUser){
        return res.status(400).json({
            message: "User Already Exists! Login Instead"
        })
     }

        // BCRYPT HASHED PASSWORD
     const hashedPassword = bcrypt.hashSync(password);

        // ELSE CREATE NEW USER
     const user = new User({
        name,
        email,
        password: hashedPassword,
        events: [],
     })
    
     try {
        await user.save();
     } catch (err) {
        return console.log(err)
     }
     return res.status(201).json({user})
}

///// POST LOGIN USER
export const login = async(req,res,next) => {
    const { email, password } = req.body;

    let existingUser;
     try {
        existingUser = await User.findOne({email});
     } catch (err) {
        return console.log(err)
     }
     if(!existingUser){
        return res.status(404).json({
            message: "Couldn't find the user"
        })
     }
     const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
     if(!isPasswordCorrect){
        return res.status(400).json({
            message: "Password is incorrect"
        })
     }
     return res.status(200).json({
        message: "Login successfully"
     })
}