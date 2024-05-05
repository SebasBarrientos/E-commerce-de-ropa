const { Product, Category, ProductsCategory } = require('../models/index.js');


const ProductController = {
    async create(req, res) {
        try {
            console.log("HOLAAAAAAA", req.file);
            const product = await Product.create(req.body);
            product.addCategory(req.body.CategoryId);
            res.status(201).send({ msg: "Item creado con éxito", product });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getAll(req, res) {
        try {
            const product = await Product.findAll({
                include: [{ model: Category, attributes: ["name"], through: { attributes: [] } }]
            })
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
            const product = await Product.findByPk(req.params.id)
            product.setCategories(req.body.CategoryId);
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
            await ProductsCategory.destroy({
                where: {
                    ProductId: req.params.id,
                },
            });
            res.send("El producto ha sido eliminado con éxito");
            
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id, {include: [{ model: Category, attributes: ["name"], through: { attributes: [] } }]});
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
                },include: [{ model: Category, attributes: ["name"], through: { attributes: [] } }]
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
                },include: [{ model: Category, attributes: ["name"], through: { attributes: [] } }]
            });
            res.send(product);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getAllOrderByPrice(req, res) {
        try {
            const product = await Product.findAll({
                include: [{ model: Category, attributes: ["name"], through: { attributes: [] }}],
                order: [['price', 'DESC']]
            })
            res.send({ msg: "Todos los productos", product })
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
}




module.exports = ProductController
