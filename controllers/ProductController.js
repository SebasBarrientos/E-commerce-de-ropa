const { Product } = require('../models/index.js');


const ProductController = {
    async create(req, res) {
        try {
            const product = await Product.create(req.body);
            res.status(201).send({ msg: "Usuario creado con éxito", product });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getAll(req, res) {
        try {
            const product = await Product.findAll() //ACA VA A IR EL JOIN DE DE MUCHOS A MUCHOS
            res.send({ msg: "Todos los productos", product })
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async updateById(req, res) {
        try {
            await Product.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.send("Producto actualizado con éxito");
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async deleteById(req, res) {
        try {
            await Product.destroy({
                where: {
                    id: req.params.id,
                },
            });
            //   await ProductsCategorys.destroy({
            //     where: {
            //       UserId: req.params.id,
            //     },
            //   });
            res.send("El producto ha sido eliminado con éxito");

        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            res.send(product);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getByName(req, res) {
        try {
            const product = await Product.findAll({
                where: {
                    name: req.params.name,
                },
            });
            res.send(product);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getByPrice(req, res) {
        try {
            const product = await Product.findAll({
                where: {
                    price: req.query.price,
                },
            });
            res.send(product);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
}

module.exports = ProductController
