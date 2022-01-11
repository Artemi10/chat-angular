import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../../../../services/token/token.service';
import {Chat} from "../../../../models/chat.model";
import {ChatService} from 'src/services/chat/chat.service';
import {PopUpType} from "../../pop-ups/pop-ups";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private chat: Chat | undefined;
  @Output() public openPopUpEvent: EventEmitter<PopUpType>;

  constructor(private tokenService: TokenService, private router: Router,
              private chatService: ChatService) {
    this.openPopUpEvent = new EventEmitter<PopUpType>();
    this.chat = this.chatService.currentChat;
    this.chatService.currentChatChangedEvent
      .subscribe(chat => this.chat = chat);
  }

  get isChatChosen(): boolean{
    return this.chat != null;
  }

  get isAdmin(): boolean{
    return this.chat != null
      && this.chat.admin.login === this.tokenService.getUserLogin()
  }

  get chatName(): string | undefined{
    return this.chat?.name;
  }

  public clickSearchButtonListener() {
    this.openPopUpEvent.emit(PopUpType.SEARCH_MESSAGE);
  }

  public clickOpenAccountButtonListener() {
    this.openPopUpEvent.emit(PopUpType.USER_ACCOUNT);
  }

  public clickOpenCreateChatPopupListener() {
    this.openPopUpEvent.emit(PopUpType.CREATE_CHAT);
  }

  public clickOpenUpdateChatPopupListener() {
    this.openPopUpEvent.emit(PopUpType.UPDATE_CHAT);
  }

  public logOut(): void{
    this.chatService.currentChat = undefined;
    this.tokenService.removeToken();
    this.router.navigate(['/logIn']);
  }

}
