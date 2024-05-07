const request = require("supertest");
const app = require("../index");
const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

describe("tester", () => {
    afterAll(() => {
        return User.destroy({ where: {role:"user"} }); //truncate tabla users
    });

    const user = {
        name: "Username",
        email: "sebas33696@gmail.com",
        password: "contrasena123",
        role: "user",
    };

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
    test("LogOut a user", async () => {
        const res = await request(app)
        .delete("/users/logout")
        .set({ Authorization: token })
        .expect(200);
        expect(res.body.message).toBe("Desconectado con éxito");
    });
});




