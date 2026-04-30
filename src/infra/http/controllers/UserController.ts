import { Request, Response } from "express";
import { ICreateUserUseCase } from "../../../application/use-cases/CreateUserUseCase";

export class UserController {
  constructor(private createUserUseCase: ICreateUserUseCase) {}
  async createUser(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;
      const user = await this.createUserUseCase.execute({
        email,
        name,
        password,
      });
      res.status(201).json({ message: "User created", data: user });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
