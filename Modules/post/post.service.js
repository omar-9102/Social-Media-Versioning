const postRepo = require('./post.repo')

class PostServices{
    async create(ownerId, data){
        if(!data.content) 
            throw new Error("Content is required")
        const slug = `${data.title.toLowerCase().split(' ').join('-')}-${Date.now()}`;
        return await postRepo.createPost(ownerId, {...data, slug})
    }

    async getUserPosts(ownerId){
        return await postRepo.getUserPosts(ownerId)
    }
}

module.exports = new PostServices()