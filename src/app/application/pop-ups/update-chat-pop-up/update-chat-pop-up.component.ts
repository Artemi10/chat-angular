import {Component, EventEmitter, Output} from '@angular/core';
import {PopUpType} from "../pop-ups";
import {Chat} from "../../../../models/chat.model";
import { ChatService } from 'src/services/chat/chat.service';
import {UsersToUpdate} from "../users-to-update";

@Component({
  selector: 'app-update-chat-pop-up',
  templateUrl: './update-chat-pop-up.component.html',
  styleUrls: ['./update-chat-pop-up.component.css']
})
export class UpdateChatPopUpComponent {
  public chat: Chat | undefined;
  public usersToUpdate: UsersToUpdate;
  @Output() public closePopUpEvent: EventEmitter<PopUpType>;

  constructor(private chatService: ChatService) {
    this.closePopUpEvent = new EventEmitter<PopUpType>();
    this.chat = chatService.currentChat;
    this.usersToUpdate = new UsersToUpdate(this.chat);
    this.chatService.currentChatChangedEvent
      .subscribe(chat => {
        this.chat = chat;
        this.usersToUpdate = new UsersToUpdate(this.chat);
      });
  }

  public closePopUp(){
    this.closePopUpEvent.emit(PopUpType.UPDATE_CHAT);
  }
}
