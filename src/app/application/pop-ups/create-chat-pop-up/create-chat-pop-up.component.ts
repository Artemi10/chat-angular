import {Component, EventEmitter, Output} from '@angular/core';
import {PopUpType} from "../pop-ups";

@Component({
  selector: 'app-create-chat-pop-up',
  templateUrl: './create-chat-pop-up.component.html',
  styleUrls: ['./create-chat-pop-up.component.css']
})
export class CreateChatPopUpComponent {
  public selectedUserLogins: Set<string>;
  @Output() public closePopUpEvent: EventEmitter<PopUpType>;

  constructor() {
    this.selectedUserLogins = new Set<string>();
    this.closePopUpEvent = new EventEmitter();
  }

  public closePopUp(){
    this.closePopUpEvent.emit(PopUpType.CREATE_CHAT);
  }

  public selectUser(login: string){
    this.selectedUserLogins.add(login);
  }
}
