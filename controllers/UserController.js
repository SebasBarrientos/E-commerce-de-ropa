const { User } = require('../models/index.js');


const UserController = {
    async create(req, res) {
        try {
            req.body.role = "user";
            const user = await User.create(req.body);
            res.status(201).send({ msg: "Usuario creado con éxito", user });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
}

module.exports = UserController
