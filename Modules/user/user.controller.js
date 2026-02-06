const userServices = require('./user.services')

const register = async(req, res, next) =>{
    try{
        const {firstName, lastName, email, username, bio} = req.body
        const user = await userServices.register(firstName, lastName, email, username, bio)
        return res.status(200).json({message: "User Created", data: user})
    }catch(error){
        return res.status(400).json({ error: error.message });
    }
}

const uploadImages = async (req, res) => {
    console.log('in controller')
    try {
        const userId = req.user.id;
        console.log(userId)
        console.log(req.files)
        const result = await userServices.mediaUploads(userId,req.files);
        res.json({message: 'Images updated successfully',data: result,});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async(req, res, next) =>{
    try{
        const {email} = req.body
        await userServices.login(email)
        res.status(200).json({message:'Magic link sent'})
    }catch(error){
        return res.status(400).json({error: error.message})
    }
}

const getUsers = async(req, res, next) =>{
    const users = await userServices.get()
    return res.status(200).json({data: users})
}

const getUserCountedPosts = async (req, res, next) =>{
    const id = req.user.id
    const counted = await userServices.getUsersCountedPosts(id)
    return res.status(200).json({data: counted})
}

const getUserContributions = async(req, res, next) =>{
    try{
        const id = req.user.id
        const contributions = await userServices.getUserContributions(id)
        return res.status(200).json({data: contributions})
    }catch(error){
        return next(error)
    }
}

module.exports = {
    register,
    getUsers,
    getUserCountedPosts,
    login,
    getUserContributions,
    uploadImages
}
