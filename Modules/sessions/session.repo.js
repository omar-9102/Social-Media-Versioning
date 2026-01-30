const prisma = require('../../lib/prisma')


class SessionRepository{
    async createSession(userdata){
        return await prisma.session.create({data:userdata,})
    }
}

module.exports = new SessionRepository()