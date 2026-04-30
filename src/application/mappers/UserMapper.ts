import { User } from "../../domain/entities/User";
import { UserDTO } from "../dtos/UserDTO";

export class UserMapper {
  static toDto(user: User): UserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
