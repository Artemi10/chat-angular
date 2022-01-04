import {Component, EventEmitter, Output} from '@angular/core';
import {PopUpType} from "../pop-ups";
import {Chat} from "../../../../models/chat.model";
import { ChatService } from 'src/services/chat/chat.service';

@Component({
  selector: 'app-update-chat-pop-up',
  templateUrl: './update-chat-pop-up.component.html',
  styleUrls: ['./update-chat-pop-up.component.css']
})
export class UpdateChatPopUpComponent {
  private chat: Chat | undefined;
  public selectedUserLogins: Set<string>;
  @Output() public closePopUpEvent: EventEmitter<PopUpType>;

  constructor(private chatService: ChatService) {
    this.closePopUpEvent = new EventEmitter<PopUpType>();
    this.chat = chatService.currentChat;
    this.selectedUserLogins = this.getSelectedUserLogins();
    this.chatService.currentChatChangedEvent
      .subscribe(chat => {
        this.chat = chat;
        this.selectedUserLogins = this.getSelectedUserLogins();
      });
  }

  public get chatName(): string | undefined {
    return this.chat?.name;
  }

  private getSelectedUserLogins(): Set<string>{
    const selectedUserLogins = new Set<string>();
    if (this.chat !== undefined) {
      this.chat.users
        .map(user => user.login)
        .forEach(login => selectedUserLogins.add(login));
    }
    return selectedUserLogins;
  }

  public closePopUp(){
    this.closePopUpEvent.emit(PopUpType.UPDATE_CHAT);
  }

  public selectUser(login: string){
    this.selectedUserLogins.add(login);
  }
}
