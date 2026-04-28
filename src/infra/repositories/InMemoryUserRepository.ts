import { IUserRepository } from "../../application/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

export class InMemoryUserRepository implements IUserRepository {
  public users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
    return;
  }

  async findByEmail(email: string): Promise<User | null> {
    const find = this.users.find((user) => user.email === email);
    return find ?? null;
  }
}
