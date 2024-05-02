const { Category } = require("../models/index");

const CategoryController = {
    async create(req,res){
        try {
            const category = await Category.create(req.body)
            res.status(201).send({msg:"Categoria creada con éxito",category})
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    }
};

module.exports = CategoryController;