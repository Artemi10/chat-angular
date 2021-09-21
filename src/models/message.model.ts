export class Message {
  public id: string;
  public login: string;
  public content: string;

  constructor(id: string, login: string, content: string) {
    this.id = id;
    this.login = login;
    this.content = content;
  }
}
