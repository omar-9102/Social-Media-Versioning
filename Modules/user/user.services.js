const userRepo = require('./user.repo')
const crypto = require('node:crypto')

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

        const token = crypto.randomBytes(32).toString('hex')
        userRepo.createAuthToken({
            token: token,
            type: 'LOGIN',
            userId: existingUser.id,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000)
        })
        console.log(`Magic Link: https://localhost:4000/api/auth/verify?token=${token}`)
    }

    async get(){
        const users = await userRepo.getAllUsers()
        if(!users)
            throw new Error("No Users Found")
        return  users
    }

    async getUsersCountedPosts(sid){
        const counted = await userRepo.getUserCountedPosts(sid)
        if(counted.lenght == 0){
            throw new Error("User has no posts")
        }
    }

}

module.exports = new UserServices()