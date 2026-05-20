import { Request, Response } from "express";
import { ICreateUserUseCase } from "../../../application/use-cases/CreateUserUseCase";
import { ConflictError } from "../../../application/errors/ConflictError";
import { BadRequestError } from "../../../application/errors/BadRequestError";

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
      if (error instanceof ConflictError) {
        return res.status(409).json({ message: error.message });
      }
      if (error instanceof BadRequestError) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}
