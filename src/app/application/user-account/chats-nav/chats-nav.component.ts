import {Component, Input, OnInit} from '@angular/core';
import { ChatService } from 'src/services/chat/chat.service';
import {Chat} from "../../../../models/chat.model";
import {ErrorHandlerService} from "../../../../services/error_handler/error-handler.service";

@Component({
  selector: 'app-chats-nav',
  templateUrl: './chats-nav.component.html',
  styleUrls: ['./chats-nav.component.css']
})
export class ChatsNavComponent implements OnInit {
  public isChatCollectionOpened: boolean;
  private readonly pageSize: number;
  private pageNumber: number;
  private isScrolledDown: boolean;
  @Input() public chats: Chat[];

  constructor(private chatService: ChatService,
              private errorHandler: ErrorHandlerService) {
    this.isChatCollectionOpened = false;
    this.chats = [];
    this.pageSize = 30;
    this.pageNumber = 0;
    this.isScrolledDown = false;
  }

  ngOnInit() {
    this.chatService.getUserChats(this.pageNumber, this.pageSize)
      .subscribe(
        chats => this.chats = chats,
        error => this.errorHandler.handleForbidden(error));
    this.chatService.newChatCreatedEvent
      .subscribe(newChat => this.chats.push(newChat))
  }

  public clickOpenListener(){
    this.isChatCollectionOpened = !this.isChatCollectionOpened;
  }

  public choseChatListener(chat: Chat){
    this.chatService.changeCurrentChat(chat);
  }

  public scrolledEventListener(){
    if (!this.isScrolledDown){
      this.pageNumber++;
      this.chatService.getUserChats(this.pageNumber, this.pageSize)
        .subscribe(
          chats => {
            this.chats = this.chats.concat(chats);
            if (chats.length == 0) {
              this.isScrolledDown = true;
            }
          },
          error => this.errorHandler.handleForbidden(error));
    }
  }
}
