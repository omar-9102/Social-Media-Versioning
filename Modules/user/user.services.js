const userRepo = require('./user.repo')
const crypto = require('node:crypto')
const authTokenRepo = require('../authToken/authToken.repo')
require('dotenv').config();


class UserServices {
    async register(firstName, lastName, email, username, bio){
        const existingUser = await userRepo.findByEmail(email)
        if(existingUser)
            throw new Error("User already exist")

        const existingusername = await userRepo.findByUsername(username)
        if(existingusername)
            throw new Error("Username already exist choose another one")

        const userEmail = email.toLowerCase();
        return userRepo.register({
            firstName: firstName, 
            lastName: lastName,
            email: userEmail,
            username: username,
            bio: bio})
    }

    async login(email){
        const existingUser = await userRepo.findByEmail(email)
        if(!existingUser)
            throw new Error("User not found")

        const rawToken = crypto.randomBytes(32).toString('hex')
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')
        const PORT = process.env.PORT
        const magicLink = ` http://localhost:${PORT}/api/auth/verify?token=${rawToken}`;
        await authTokenRepo.createAuthToken({
            token: hashedToken,
            type: 'LOGIN',
            userId: existingUser.id,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000)
        })
        console.log(`Magic Link: ${magicLink}`)
    }

    async get(){
        const users = await userRepo.getAllUsers()
        if(!users)
            throw new Error("No Users Found")
        return  users
    }

    async getUsersCountedPosts(sid){
        const counted = await userRepo.getUserCountedPosts(sid)
        if(counted.length == 0){
            throw new Error("User has no posts")
        }
        return counted
    }

    async getUserContributions(userId){
        const contributions = await userRepo.getUserContributions(userId)
        return contributions
    }

}

module.exports = new UserServices()