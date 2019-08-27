const User = require('../models/User');

async function createUser(req, res) {

    const { usuario } = req.body;
    try {
        if ( await User.findOne({ usuario }) )
            return res.status(400).send({ error: 'User already exists' });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.status(200).json({
            user
        });
    } catch (err) {
        return res.status(400).send({error: 'Registration failed'});
    }

}

async function findUsers(req, res) {

    const users = await User.find().sort('-createdAt');

    return res.json(users);

}

async function findUserById(req, res) {

    var id = req.params.id;
    const user = await User.findById(id);

    return res.json(user);

}

async function updateUser(req, res) {

    const { _id, name, usuario, email, password } = req.body;

    if (password === "******") {

        User.updateOne({_id}, {
            '$set': { name, usuario, email }
        }, function (err, result){

            if(err){
                if(err.code == 11000)
                    return res.json({ fail: "User or email duplicated" });
                else
                    return res.json({ fail: "Fail updated" });
            }

            return res.status(200).json({
                success: "User updated"
            });
        });
       

    } else {

        const user = await User.findOne({ _id });

        user.name = name;
        user.usuario = usuario;
        user.email = email;
        user.password = password;

        await user.save();
    
        return res.status(200).json({
            success: "User updated"
        });

    }
    
}

module.exports = {
    findUsers,
    findUserById,
    createUser,
    updateUser
}