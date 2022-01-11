import {Component} from '@angular/core';
import {PopUps, PopUpType} from './pop-ups/pop-ups';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent {
  private popUps: PopUps;

  constructor() {
    this.popUps = new PopUps();
  }

  public get isUserAccountOpened(): boolean {
    return this.popUps.isOpened(PopUpType.USER_ACCOUNT);
  }

  public get isUpdateChatPopUpOpened(): boolean {
    return this.popUps.isOpened(PopUpType.UPDATE_CHAT);
  }

  public get isCreateChatPopUpOpened(): boolean {
    return this.popUps.isOpened(PopUpType.CREATE_CHAT);
  }

  //TODO
  public get isSearchMessageOpened(): boolean {
    return this.popUps.isOpened(PopUpType.SEARCH_MESSAGE);
  }

  public openPopUpListener(popUpType: PopUpType) {
    this.popUps.openPopUp(popUpType);
  }

  public closePopUpListener(popUpType: PopUpType) {
    this.popUps.closePopUp(popUpType);
  }
}
