const sessionRepo = require('../Modules/sessions/session.repo')
async function authenticate(req, res, next){
    const sid = req.cookies.sid
    if(!sid) return res.status(401).json({error: 'No session id found'})  
    const session = await sessionRepo.findSessionById(sid)
    if(!session || session.expiresAt < new Date()) return res.status(401).json({error: 'Session expired'})
    req.user = session.user
    req.session = session
    next()
}

module.exports = {
    authenticate
}