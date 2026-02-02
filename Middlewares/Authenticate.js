const sessionRepo = require('../Modules/sessions/session.repo')
async function authenticate(req, res, next){
    try{
        const sid = req.cookies.sid
        if(!sid) return res.status(401).json({error: 'Unauthenticated'})  
        const session = await sessionRepo.findSessionById(sid)
        if(!session || session.expiresAt < new Date()) return res.status(401).json({error: 'Session expired'})
        req.user = session.user
        req.session = session
        next()
    }catch(error){
        next(error)
    }
}

module.exports = {
    authenticate
}