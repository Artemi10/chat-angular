import {Component, EventEmitter, Output} from '@angular/core';
import {PopUpType} from "../pop-ups";
import { UsersToUpdate } from '../users-to-update';

@Component({
  selector: 'app-create-chat-pop-up',
  templateUrl: './create-chat-pop-up.component.html',
  styleUrls: ['./create-chat-pop-up.component.css']
})
export class CreateChatPopUpComponent {
  public usersToUpdate: UsersToUpdate;
  @Output() public closePopUpEvent: EventEmitter<PopUpType>;

  constructor() {
    this.usersToUpdate = new UsersToUpdate();
    this.closePopUpEvent = new EventEmitter();
  }

  public closePopUp(){
    this.closePopUpEvent.emit(PopUpType.CREATE_CHAT);
  }
}
