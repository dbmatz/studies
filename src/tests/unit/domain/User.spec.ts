import { User } from "../../../domain/entities/User";

describe("User", () => {
  it("Must create an user with an automatically generated ID", () => {
    const user = new User({
      name: "Fulano Silva",
      email: "fulano@email.com",
      password: "senha@123",
    });
    expect(user.id).toBeDefined();
  });
  it("Must create an user with a given ID", () => {
    const user = new User(
      {
        name: "Ciclano Souza",
        email: "ciclano@email.com",
        password: "senha@123",
      },
      "666",
    );
    expect(user.id).toBeDefined();
    expect(user.id).toBe("666");
  });
  it("Must store the data correctly", () => {
    const user = new User({
      name: "Beltrano Amaral",
      email: "beltrano@email.com",
      password: "senha@123",
    });
    expect(user.id).toBeDefined();
    expect(user.name).toBe("Beltrano Amaral");
    expect(user.email).toBe("beltrano@email.com");
  });
  it("Must not contain the password", () => {
    const user = new User({
      name: "Beltrano Amaral",
      email: "beltrano@email.com",
      password: "senha@123",
    });
    const json = JSON.stringify(user);
    expect(json).not.toContain("senha@123");
  });
});
