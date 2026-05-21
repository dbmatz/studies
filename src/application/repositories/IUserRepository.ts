import { User } from "../../domain/entities/User";

export interface IUserRepository {
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>
    findByID(id: string): Promise<User | null>
}