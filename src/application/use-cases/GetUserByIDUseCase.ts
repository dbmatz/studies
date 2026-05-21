import { IUserRepository } from "../repositories/IUserRepository";
import { UserDTO } from "../dtos/UserDTO";
import { UserMapper } from "../mappers/UserMapper";
import { NotFoundError } from "../errors/NotFoundError";

export interface GetUserByIDInput {
  id: string;
}

export interface IGetUserByIDUseCase {
  execute(dto: GetUserByIDInput): Promise<UserDTO>;
}

export class GetUserByIDUseCase implements IGetUserByIDUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: GetUserByIDInput): Promise<UserDTO> {
    const { id } = dto;
    const foundUser = await this.userRepository.findByID(id);
    if (!foundUser) {
      throw new NotFoundError("User not found");
    }
    return UserMapper.toDto(foundUser);
  }
}
