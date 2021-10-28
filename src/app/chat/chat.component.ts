import {AfterViewChecked, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Message} from "../../models/message.model";
import {MessageService} from "../../services/message/message.service";
import {LiveMessageService} from "../../services/live_message/live-message.service";
import {ErrorHandlerService} from "../../services/error_handler/error-handler.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked{
  public messages: Message[] = [];
  public isScrolled: boolean = false;
  public isFinalMessages: boolean = false;
  public isRequestSent: boolean = false;
  @Output() openSearchEvent = new EventEmitter();
  @ViewChild('scrolling') private myScrollContainer: ElementRef | undefined;

  constructor(private messageService: MessageService, private liveMessageService: LiveMessageService,
              private errorHandler: ErrorHandlerService) {
    liveMessageService.createConnection();
    messageService.getLatestMessages()
      .subscribe((messages: Message[]) => {
          this.messages = messages;
          this.isFinalMessages = messages.length < 10;
        },
        error => errorHandler.handleForbidden(error))
    liveMessageService.messageSubscribe
      .subscribe((message: Message) => this.messages.push(message))
  }

  ngAfterViewChecked() : void {
    if (!this.isScrolled){
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    if (this.myScrollContainer !== undefined && this.myScrollContainer.nativeElement.scrollHeight !== 0){
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
  }

  scrolledEventListener(): void{
    this.isScrolled = true;
    if (!this.isFinalMessages && !this.isRequestSent){
      if (this.myScrollContainer!.nativeElement.scrollTop < 100){
        this.isRequestSent = true;
        const prevHeight = this.myScrollContainer!.nativeElement.scrollHeight;
        this.messageService.getNextLatestMessages(this.messages.length)
          .subscribe((messages: Message[]) => {
            this.messages = messages.concat(this.messages);
            this.isFinalMessages = messages.length < 10;
            this.isRequestSent = false;
            setTimeout(() => this.myScrollContainer!.nativeElement.scrollTop =
              this.myScrollContainer!.nativeElement.scrollHeight - prevHeight)
          }, error => this.errorHandler.handleForbidden(error))
      }
    }
  }
  public openSearchForm(): void{
    this.openSearchEvent.emit();
  }

}
