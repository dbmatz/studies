import { v4 } from "uuid";

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  private password: string;

  constructor(
    props: { name: string; email: string; password: string },
    id?: string,
  ) {
    this.id = id ?? v4();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }
  
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
