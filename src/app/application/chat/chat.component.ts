import {AfterViewChecked, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Message} from "../../../models/message.model";
import {MessageService} from "../../../services/message/message.service";
import {LiveMessageService} from "../../../services/live_message/live-message.service";
import {ErrorHandlerService} from "../../../services/error_handler/error-handler.service";
import { ChatService } from 'src/services/chat/chat.service';
import {Chat} from "../../../models/chat.model";
import {PopUpType} from "../pop-ups/pop-ups";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {
  public messages: Message[];
  private isScrolled: boolean;
  private isRequestSent: boolean;
  @Output() public openPopUpEvent: EventEmitter<PopUpType>;
  @ViewChild('scrolling') private _myScrollContainer: ElementRef | undefined;
  public chat: Chat | undefined;

  constructor(private messageService: MessageService, private liveMessageService: LiveMessageService,
              private errorHandler: ErrorHandlerService, private chatService: ChatService) {
    this.messages = [];
    this.isScrolled = false;
    this.isRequestSent = false;
    this.openPopUpEvent = new EventEmitter<PopUpType>();
    this.liveMessageService.messageSubscribe.subscribe(
      message => this.addMessage(message),
      error => this.handleError(error)
    );
    this.chat = this.chatService.currentChat;
    this.chatService.currentChatChangedEvent
      .subscribe(chat => {
        this.chat = chat;
        this.loadMessages();
      });
  }

  public get isChatChosen(): boolean{
    return this.chat !== undefined;
  }

  public get isFinalMessages(): boolean{
    return this.messages.length < 10;
  }

  private get scrollHeight(): number{
    return this._myScrollContainer!.nativeElement.scrollHeight;
  }

  private set scrollTop(value: number){
    this._myScrollContainer!.nativeElement.scrollTop = value;
  }

  private loadMessages() {
    if (this.isChatChosen) {
      this.messageService.getLatestMessages(this.chat!.id)
        .subscribe(
          messages => this.messages = messages,
          error => this.handleError(error)
      );
    }
  }

  ngAfterViewChecked() {
    if (!this.isScrolled){
      this.scrollToBottom();
    }
  }

  private addMessage(message: Message){
    if (this.isChatChosen && message.chatId === this.chat!.id){
      this.messages.push(message);
    }
  }

  private handleError(error: Error){
    this.liveMessageService.rejectConnection();
    this.errorHandler.handleForbidden(error);
  }

  public scrolledEventListener(){
    this.isScrolled = true;
    if (!this.isFinalMessages && !this.isRequestSent){
      if (this.scrollHeight < 100){
        this.isRequestSent = true;
        const prevHeight = this.scrollHeight;
        this.messageService.getNextLatestMessages(this.messages.length, 1)
          .subscribe(
            messages => {
              this.messages = messages.concat(this.messages);
              this.isRequestSent = false;
              setTimeout(() => this.updateHeight(prevHeight));
            },
            error => this.handleError(error));
      }
    }
  }

  private updateHeight(prevHeight: number){
    this.scrollTop = this.scrollHeight - prevHeight;
  }

  public scrollToBottom() {
    if (this._myScrollContainer !== undefined && this.scrollHeight !== 0){
      this.scrollTop = this.scrollHeight;
    }
  }

  public openPopUp(popUpType: PopUpType) {
    this.openPopUpEvent.emit(popUpType);
  }
}
