const prisma = require('../../lib/prisma');

class PostsRepository{
    async createPost(ownerId, data){
        return await prisma.$transaction(async (tx) =>{
            const post = await tx.post.create({
                data:{
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    authorId: ownerId
                }
            })

            await tx.postVersion.create({
                data:{
                    content: data.content,
                    postId: post.id,
                    editorId: ownerId
                }
            })
            return post
        })
    }

    async getUserPosts(ownerId){
        return await prisma.post.findMany({
            where:{
                authorId: ownerId,
                deletedAt: null
            },
            orderBy: {createdAt: 'desc'}
        })
    }
}

module.exports = new PostsRepository()