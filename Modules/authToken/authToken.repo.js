const prisma = require("../../lib/prisma");

class AuthTokenRepository{
    async findToken(token){
        return prisma.authToken.findUnique({where:{token}})
    }
}

module.exports = new AuthTokenRepository()