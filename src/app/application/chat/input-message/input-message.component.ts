import {Component, Input} from '@angular/core';
import {LiveMessageService} from "../../../../services/live_message/live-message.service";

@Component({
  selector: 'app-input-message',
  templateUrl: './input-message.component.html',
  styleUrls: ['./input-message.component.css']
})
export class InputMessageComponent {
  @Input() chatId: number | undefined;
  public messageContent: string;

  constructor(private liveMessageService: LiveMessageService) {
    this.messageContent = '';
  }

  public get isButtonDisabled(): boolean{
    return this.messageContent.trim() == '';
  }

  public sendMessage(): void{
    if (this.chatId !== undefined){
      this.liveMessageService.sendMessage(this.messageContent, this.chatId);
    }
  }
}
