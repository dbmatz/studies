import { Request, Response } from "express";
import { ICreateUserUseCase } from "../../../application/use-cases/CreateUserUseCase";
import { ConflictError } from "../../../application/errors/ConflictError";
import { BadRequestError } from "../../../application/errors/BadRequestError";
import { IGetUserByIDUseCase } from "../../../application/use-cases/GetUserByIDUseCase";
import { NotFoundError } from "../../../application/errors/NotFoundError";

export class UserController {
  constructor(
    private createUserUseCase: ICreateUserUseCase,
    private getUserByIDUseCase: IGetUserByIDUseCase,
  ) {}
  async createUser(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;
      if (!email || !name || !password) {
        throw new BadRequestError("Please provide the required information.");
      }
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

  async getById(req: Request, res: Response) {
    try {
      const rawId = req.query.id;
      const id = Array.isArray(rawId) ? rawId[0] : rawId;

      if (!id || typeof id !== "string") {
        throw new BadRequestError("Missing id");
      }

      const user = await this.getUserByIDUseCase.execute({ id });

      res.status(200).json({ message: "User found", data: user });
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof BadRequestError) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}
