const postServices = require('./post.service') 


const create = async(req, res, next) =>{
    try{
        const userId = req.user.id
        const data = req.body
        const post = await postServices.create(userId, data)
        res.status(201).json({message:"Post Created!!", data: post});
    }catch(error){
        next(error)
    }
}

const getUserPosts = async(req, res, next) =>{
    try{
        const userId = req.user.id
        const posts = await postServices.getUserPosts(userId)
        res.status(201).json({message: "Your posts!", data: posts})
    }catch(error){
        next(error)
    }
}

module.exports = {
    create,
    getUserPosts
}