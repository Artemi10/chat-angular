export class PopUps{
  private popsMap: Map<PopUpType, boolean>;

  constructor() {
    this.popsMap = new Map([
      [PopUpType.CREATE_CHAT, false],
      [PopUpType.SEARCH_MESSAGE, false],
      [PopUpType.UPDATE_CHAT, false],
      [PopUpType.USER_ACCOUNT, false]
    ]);
  }

  public openPopUp(popUpType: PopUpType){
    this.popsMap
      .forEach((_, key) => this.popsMap.set(key, false))
    this.popsMap.set(popUpType, true);
  }

  public closePopUp(popUpType: PopUpType){
    this.popsMap.set(popUpType, false);
  }

  public isOpened(popUpType: PopUpType): boolean {
    const isOpened = this.popsMap.get(popUpType);
    return isOpened === undefined ? false : isOpened;
  }
}

export enum PopUpType{
  CREATE_CHAT = "CREATE_CHAT",
  UPDATE_CHAT = "UPDATE_CHAT",
  USER_ACCOUNT = "USER_ACCOUNT",
  SEARCH_MESSAGE = "SEARCH_MESSAGE"
}
