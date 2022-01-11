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

export class Chats implements Iterable<Chat>{
  private chatMap: Map<number, Chat>;

  constructor(chats: Chat[] = []) {
    this.chatMap = new Map<number, Chat>(chats.map(chat => [chat.id, chat]));
  }

  public add(chat: Chat){
    this.chatMap.set(chat.id, chat);
  }

  public addAll(chats: Chat[]){
    chats.forEach(chat => this.add(chat));
  }

  [Symbol.iterator](): Iterator<Chat> {
    return this.chatMap.values();
  }
}
