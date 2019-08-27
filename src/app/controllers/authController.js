const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.jwtSecret, {
        expiresIn: 3600
    });
};


// Geração do token para acesso
async function token(req, res) {

    if (req.body.email && req.body.password) {

        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (user.bloqueado)
            return res.status(400).send({ error: 'Blocked user' });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Invalid password' });

        user.password = undefined;
        user.createdAt = undefined;
        user.updatedAt = undefined;
        user.__v = undefined;

        res.send({
            user,
            token: generateToken({ id: user.id })
        });

    } else {
        res.sendStatus(401);
    }

}

module.exports = {
    token
}