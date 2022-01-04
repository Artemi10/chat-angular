export class User {
  public readonly id: number;
  public readonly login: string;
  public readonly birthDate: Date;

  constructor(id: number, login: string, birthDate: Date) {
    this.id = id;
    this.login = login;
    this.birthDate = birthDate;
  }
}
