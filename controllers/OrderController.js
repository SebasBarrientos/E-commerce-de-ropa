const { Order, User, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;

const OrderController = {
    async create(req, res) {
        try {
            req.body.UserId = req.user.id //el UserId va a ser el del usuario logueadeo
            const order = await Order.create(req.body);
            res.status(201).send({ msg: "Orden creada exitosamente", order });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getAll(req, res) {
        try {
            const orders = await Order.findAll({
                include: [{ model: User, attributes: ["name", "email"] }],
            });
            res.send(orders);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getById(req, res) {
        try {
            const order = await Order.findByPk(req.params.id, {
                include: [{ model: User, attributes: ["name", "email"] }],
            });
            res.send(order);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async getByTitle(req, res) {
        try {
            const order = await Order.findAll({
                where: {
                    title: {
                        [Op.like]: `%${req.params.title}%`,
                    },
                },
            });
            res.send(order);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async delete(req, res) {
        try {
            await Order.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.send("El pedido ha sido eliminado con éxito");
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};

module.exports = OrderController;
