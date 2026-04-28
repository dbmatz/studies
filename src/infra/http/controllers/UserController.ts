import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../application/use-cases/CreateUserUseCase";

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async createUser(req: Request, res: Response) {
    try {
      const user = await this.createUserUseCase.execute(req);
      res.status(201).json({ message: "User created", data: user });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
