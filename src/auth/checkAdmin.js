var jwt = require('jsonwebtoken');
var config = require('../../config');
var User = require('../models/user');

async function verifyAdmin(req, res, next) {
    const user = await User.findById(req.userId, {password: 0}).exec();
    if (!user)
        return res.status(403).send({ auth: false, message: 'Not an User.' });
    if(!user.admin)
        return res.status(403).send({ auth: false, message: 'Not an Admin.' });
    next()
}
module.exports = verifyAdmin;
