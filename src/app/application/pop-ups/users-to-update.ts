import {Chat} from "../../../models/chat.model";

export class UsersToUpdate{
  private readonly initialChatUserLogins: Set<string>;
  private readonly _currentChatUserLogins: Set<string>;
  private readonly _userLoginsToAdd: Set<string>;
  private readonly _userLoginsToDelete: Set<string>;

  constructor(chat: Chat | undefined = undefined) {
    const initialUserLogins = this.getCurrentChatUserLogins(chat);
    this.initialChatUserLogins = initialUserLogins;
    this._currentChatUserLogins = new Set(initialUserLogins);
    this._userLoginsToAdd = new Set<string>();
    this._userLoginsToDelete = new Set<string>();
  }

  private getCurrentChatUserLogins(chat: Chat | undefined): Set<string>{
    const currentChatUserLogins = new Set<string>();
    if (chat !== undefined) {
      chat.users
        .map(user => user.login)
        .forEach(login => currentChatUserLogins.add(login));
    }
    return currentChatUserLogins;
  }

  public delete(login: string) {
    if (this._userLoginsToAdd.has(login)){
      this._userLoginsToAdd.delete(login);
    }
    else {
      this._userLoginsToDelete.add(login);
    }
    this._currentChatUserLogins.delete(login);
  }

  public add(login: string) {
    if (this.initialChatUserLogins.has(login)){
      this._userLoginsToDelete.delete(login);
    }
    else {
      this._userLoginsToAdd.add(login);
    }
    this._currentChatUserLogins.add(login);
  }

  public has(login: string): boolean{
    return this._currentChatUserLogins.has(login);
  }

  public get userLoginsToAdd(): string[]{
    return [...this._userLoginsToAdd];
  }

  public get userLoginsToDelete(): string[]{
    return [...this._userLoginsToDelete];
  }

  public get currentChatUserLogins(): string[]{
    return [...this._currentChatUserLogins];
  }
}
