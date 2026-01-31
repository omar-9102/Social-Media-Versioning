const prisma = require("../../lib/prisma");

class AuthTokenRepository{
    async findToken(token){
        return prisma.authToken.findUnique({where:{token}})
    }
    
    async createAuthToken(userdata){
        return await prisma.authToken.create({data:userdata,})
    }
}

module.exports = new AuthTokenRepository()