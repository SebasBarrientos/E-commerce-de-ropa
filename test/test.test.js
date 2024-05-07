const request = require("supertest");
const app = require("../index");
const { User, Product } = require("../models/index");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

describe("tester", () => {
    afterAll(() => {

        return User.destroy({ where: { role: "user" } }), Product.destroy({ where: {}, truncate: true }); //truncate tabla users
    });

    const user = {
        name: "Username",
        email: "sebas33696@gmail.com",
        password: "contrasena123",
        role: "user",
    };
    const product = {
        name: 'Pantalon',
        description: 'Pantalon de jean negro',
        size: "M",
        price: 20,
        stock: 20,
        CategoryId: 2
    }

    test("Create a user", async () => {
        const res = await request(app)
            .post("/users")
            .send(user)
            .expect(201)
        const sendUser = {
            ...user,
            id: res.body.user.id,
            password: res.body.user.password,
            createdAt: res.body.user.createdAt,
            updatedAt: res.body.user.updatedAt,
        };
        const newUser = res.body.user;
        expect(newUser).toEqual(sendUser);
    });


    let token;
    test("Login a user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({ email: "sebas33696@gmail.com", password: "contrasena123" })
            .expect(200);
        token = res.body.token;
    });
    test("Search your user info", async () => {
        const res = await request(app)
            .get("/users/id")
            .set({ Authorization: token })
            .expect(200);

    });
    test("Update your info", async () => {
        const updateUser = {
            name: "Username",
            email: "sebas33696@gmail.com",
        };

        const res = await request(app)
            .put("/users")
            .send(updateUser)
            .set({ Authorization: token })
            .expect(200);
        expect(res.text).toBe("Usuario actualizado con éxito");
    });
    test("Create Order", async () => {
        const order = {
            "date": "2024-05-02",
            "ProductId": [4, 6, 8]
        }
        const res = await request(app)
            .post("/orders")
            .set({ Authorization: token })
            .expect(201);
        expect(res.body.msg).toBe("Orden creada exitosamente");
    });
    // test("Delete a user", async () => {
    //     const res = await request(app)
    //         .delete("/users/id/2")
    //         .set({ Authorization: tokenAdmin })
    //         .expect(200);
    //     expect(res.text).toBe("El usuario ha sido eliminado con éxito");
    // });



    test("LogOut a user", async () => {
        const res = await request(app)
            .delete("/users/logout")
            .set({ Authorization: token })
            .expect(200);
        expect(res.body.message).toBe("Desconectado con éxito");
    });
    let tokenAdmin;

    test("Login as admin", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({ email: "admin@admin.com", password: "contrasena123" })
            .expect(200);
        tokenAdmin = res.body.token;
    });
    test("Delete a user", async () => {
        const res = await request(app)
            .delete("/users/id/2")
            .set({ Authorization: tokenAdmin })
            .expect(200);
        expect(res.text).toBe("El usuario ha sido eliminado con éxito");
    });

    test("Create product", async () => {
        const res = await request(app)
            .post("/products")
            .send(product)
            .set({ Authorization: tokenAdmin })
            .expect(201)
        const sendProduct = {
            ...product,
            id: res.body.product.id,
            createdAt: res.body.product.createdAt,
            updatedAt: res.body.product.updatedAt,
            image: ""
        };
        const newProduct = res.body.product;
        expect({ ...newProduct, CategoryId: 2 }).toEqual(sendProduct);
    });
    test("Get all products", async () => {
        const res = await request(app)
            .get("/products")
            .expect(200)
        expect(res.body.msg).toBe("Todos los productos");
    });
    test("Update product by id", async () => {
        const updateProduct = {
            name: "cambio de nombre"
        };

        const res = await request(app)
            .put("/products/id/1")
            .send(updateProduct)
            .set({ Authorization: tokenAdmin })
            .expect(200);
        expect(res.body.msg).toBe("Producto actualizado con éxito");
    });
    test("Delete a product", async () => {
        const res = await request(app)
            .delete("/products/id/1")
            .set({ Authorization: tokenAdmin })
            .expect(200);
        expect(res.text).toBe("El producto ha sido eliminado con éxito");
    });

});




