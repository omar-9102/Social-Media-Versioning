const authService = require('./auth.services')

const verify = async (req, res, next)=> {
    try{
        const {token} = req.query
        const ip = req.ip
        const userAgent = req.headers['user-agent']
        const session = await authService.verify(token,{ip, userAgent})
        console.log('Before cookie')
        res.cookie('sid', session.id,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: session.expiresAt
        })
        res.status(200).json({ message: 'Authenticated' })
    }catch(error){
        return res.status(401).json({error: error.message})
    }   
}

module.exports = {
    verify
}
