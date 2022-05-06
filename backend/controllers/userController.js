import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/UserModels.js'

/**
 * @desc Register User
 * @route POST api/users
 * @access Public
 */

const regUser = asyncHandler( async(req, res) => {
     const { name, email, password } = req.body;

     if(!name || !email || !password) {
         res.status(400)
         throw new Error('Please add all fields')
     }

    //  check if user exists
    const userExist = await User.findOne({ email })

    if(userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt) 

    // create user
    const user = await User.create({ 
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: genToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

/**
 * @desc Login User
 * @route POST api/users/login
 * @access Public
 */
 const logUser = asyncHandler( async( req, res) => {
    const { email, password} = req.body;
 
    // Check for use email
      const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: genToken(user._id)
        }) 
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
        console.log(error)
    }
 } )


// generate jwt token
const genToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP
    })
}



export { regUser, logUser }