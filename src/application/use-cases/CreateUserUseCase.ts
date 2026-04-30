import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { IHashService } from "../services/IHashService";
import { UserDTO } from "../dtos/UserDTO";
import { UserMapper } from "../mappers/UserMapper";
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface ICreateUserUseCase {
  execute(dto: CreateUserInput): Promise<UserDTO>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
  ) {}

  async execute(dto: CreateUserInput): Promise<UserDTO> {
    const { email, name, password } = dto;
    if (!email || !name || !password) {
      throw new Error("Please provide the required information.");
    }
    const uniqueEmail = await this.userRepository.findByEmail(email);
    if (uniqueEmail) {
      throw new Error("Email is already in use.");
    }

    const hashedPassword = await this.hashService.hash(password)
    const user = new User({ email, name, password: hashedPassword });
    await this.userRepository.save(user);
    return UserMapper.toDto(user);
  }
}
