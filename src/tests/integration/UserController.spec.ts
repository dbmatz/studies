import supertest from "supertest";
import { app } from "../../app";
import { inMemoryUserRepository } from "../../infra/http/containers/user.container";

describe("UserController", () => {
  beforeEach(async () => {
    inMemoryUserRepository.clear();
  });

  it("POST /user 201", async () => {
    await supertest(app)
      .post("/user")
      .send({
        name: "Fulano Silva",
        email: "fulano@email.com",
        password: "password123",
      })
      .expect(201);
  });

  it("POST /user 400", async () => {
    await supertest(app)
      .post("/user")
      .send({
        name: "Fulano Silva",
        password: "password123",
      })
      .expect(400);
  });

  it("POST /user 409", async () => {
    await supertest(app)
      .post("/user")
      .send({
        name: "Ciclano Souza",
        email: "ciclano@email.com",
        password: "password123",
      })
      .expect(201);

    await supertest(app)
      .post("/user")
      .send({
        name: "Beltrano Amaral",
        email: "ciclano@email.com",
        password: "password123",
      })
      .expect(409);
  });

  it("GET /user 200", async () => {
    let id;
    const userCreated = await supertest(app)
      .post("/user")
      .send({
        name: "Beltrano Amaral",
        email: "ciclano@email.com",
        password: "password123",
      })
      .expect(201);

    id = userCreated.body.data.id;

    const userFound = await supertest(app).get(`/user?id=${id}`).expect(200);

    expect(userFound.body.data).not.toHaveProperty("password");
    expect(userFound.body.data.id).toBe(id);
    expect(userFound.body.data.name).toBe("Beltrano Amaral");
  });

  it("GET /user 404", async () => {
    await supertest(app).get(`/user?id=666`).expect(404);
  });

  it("GET /user 400", async () => {
    await supertest(app).get(`/user`).expect(400);
  });
});
