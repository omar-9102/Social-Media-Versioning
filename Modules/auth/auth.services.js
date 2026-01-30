const prisma = require("../../lib/prisma");
const userRepo = require('../user/user.repo')
const authTokenRepo = require('../authToken/authToken.repo');
const sessionRepo = require("../sessions/session.repo");

class AuthServices{
    async verify(token){
        const authToken = await authTokenRepo.findToken(token)
        if (!authToken ||authToken.usedAt ||authToken.expiresAt < new Date())
            throw new Error('Invalid or expired token')

        const session = await sessionRepo.createSession({
            userId: authToken.userId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })
        await prisma.authToken.update({
            where:{id: authToken.id},
            data:{usedAt: new Date()}
        })
        return session
    }
}

module.exports = new AuthServices()
