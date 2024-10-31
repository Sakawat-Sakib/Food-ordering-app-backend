import User from '../models/user'
import {Request, Response} from 'express'

const createCurrentUser = async (req: Request, res: Response):Promise<any> => {

    try {
        const {auth0Id} = req.body
         // 1. check if the user exist 
        const existingUser = await User.findOne({auth0Id:auth0Id})
        if(existingUser){   
            return res.status(200).send()
        }
        // 2. create the user if it doesn't exist 
        const newUser = new User(req.body)
        await newUser.save()

        // 3. return the user object to the calling client
        return res.status(201).json(newUser.toObject())

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Error creating user"})
        }
    }


 const updateCurrentUser = async (req: Request, res: Response):Promise<any> => {
    try {
        const {name, addressLine1, country, city} = req.body
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        user.name = name
        user.addressLine1 = addressLine1
        user.city = city
        user.country = country
        await user.save()

        return res.send(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error updating user"})
    }
}

const getCurrentUser = async(req:Request, res:Response):Promise<any> => {
    try {
        const currentUser = await User.findOne({_id: req.userId})
        if(!currentUser){
            return res.status(404).json({message: "User not found"})
        }

        return res.json(currentUser)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Something went wrong"})
    }
}

export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser
}
