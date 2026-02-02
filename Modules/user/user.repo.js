const prisma = require('../../lib/prisma')

class UserRepository{
    async register(userData){
        return await prisma.user.create({data: userData,})
    }

    async createAuthToken(userdata){
        return await prisma.authToken.create({data:userdata,})
    }

    async findById(userId){
        return await prisma.user.findUnique({where:{id: userId}})
    }

    async findByEmail(email){
        return await prisma.user.findUnique({where:{email}})
    }

    async findByUsername(username){
        return await prisma.user.findUnique({where:{username}})
    }

    async getAllUsers(){
        return await prisma.user.findMany()
    }

    async getUserCountedPosts(id){
    return await prisma.user.findUnique({where:{
        id : id,
    },
    select:{
        firstName: true,
        lastName: true,
        createdAt: true,
        _count: {
            select:{
                posts: true
            }
        }
        }
    })}

    async getUserContributions(userId){
        return await prisma.user.findMany({
            where:{
                id: userId
            },
            select:{
                firstName: true,
                lastName: true,
                createdAt: true,
                contributions: true
            }
        })
    }
}

module.exports = new UserRepository()