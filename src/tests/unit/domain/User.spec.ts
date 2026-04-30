import { User } from "../../../domain/entities/User";

describe("User", () => {
  it("Deve criar um usuário com um id gerado automaticamente", () => {
    const user = new User({
      name: "Fulano Silva",
      email: "fulano@email.com",
      password: "senha@123",
    });
    expect(user.id).toBeDefined();
  });
});
