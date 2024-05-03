const { Review, User, Product, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;

const ReviewController = {
    async create(req, res) {
        try {
            req.body.UserId = req.user.id //el UserId va a ser el del usuario logueadeo
            const review = await Review.create(req.body);
            res.status(201).send({ msg: "Crítica creada exitosamente", review });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getAll(req, res) {
        try {
            const reviews = await Review.findAll({
                include: [{ model: User, attributes: ["name"] }], include: [{ model: Product, attributes: ["name","description"] }],
//ARREGLAR ESTE ERROR SOLO ME MUESTRA EL Producto, no user!


            }); 
            res.send(reviews);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async updateById(req, res) {
        try {
            await Review.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.send("Crítica actualizada con éxito");
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async delete(req, res) {
        try {
            await Review.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.send("Crítica eliminada");
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};

module.exports = ReviewController;
