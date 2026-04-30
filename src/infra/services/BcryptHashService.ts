import { IHashService } from "../../application/services/IHashService";
import bcrypt from "bcrypt";

export class BcryptHashService implements IHashService {
  hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
