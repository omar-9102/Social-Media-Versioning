const { use } = require('react')
const prisma = require('../../lib/prisma')
const userRepo = require('../user/user.repo')
const sessionRepo = require('./session.repo')

class SessionServices{
    async create(userId, expireDate){
        const existingUser = await userRepo.findById(userId)
        if(!existingUser)
            throw new Error("User not found")
        return sessionRepo.createSession({
            userId: userId,
            expiresAt: expireDate
        })
    }
}

module.exports = new SessionServices()