const authService = require('./auth.services')

const verify = async (req, res, next)=> {
    try{
        const {token} = req.query
        const session = await authService.verify(token)
        res.status(200).json({ sessionId: session.id })
    }catch(error){
        return res.json({error: error.message})
    }
}

module.exports = {
    verify
}
