const prisma = require('../../lib/prisma')

class SessionRepository{
    async createSession(userdata){
        return await prisma.session.create({data:userdata,})
    }
    async findSessionById(sessionId){
        return await prisma.session.findUnique({where:{id: sessionId}, include:{user: true}})
    }

}

module.exports = new SessionRepository()