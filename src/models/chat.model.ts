import {User} from "./user.model";

export class Chat {
  public readonly id: number;
  public readonly name: string;
  public readonly admin: User;
  public readonly users: User[];

  constructor(id: number, name: string, admin: User, users: User[]) {
    this.id = id;
    this.name = name;
    this.admin = admin;
    this.users = users;
  }
}
