export class Message {
  public readonly id?: string;
  public readonly login: string;
  public readonly content: string;
  public readonly chatId: number;

  constructor(login: string, content: string, chatId: number, id?: string) {
    this.login = login;
    this.content = content;
    this.chatId = chatId;
    this.id = id;
  }
}
