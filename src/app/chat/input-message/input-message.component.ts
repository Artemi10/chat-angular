import { Component } from '@angular/core';
import { TokenService } from 'src/services/token/token.service';
import {LiveMessageService} from "../../../services/live_message/live-message.service";

@Component({
  selector: 'app-input-message',
  templateUrl: './input-message.component.html',
  styleUrls: ['./input-message.component.css']
})
export class InputMessageComponent {
  public messageContent: string = '';
  public isButtonDisabled: boolean = true;

  constructor(private liveMessageService: LiveMessageService,
              private tokenService: TokenService) { }

  public changeMessageContentListener(): void{
    this.isButtonDisabled = this.messageContent.trim() == '';
  }
  public sendMessage(): void{
    const messageToSent = {
      login: this.tokenService.getUserLogin(),
      content: this.messageContent
    };
    this.liveMessageService.sendMessage(messageToSent);
  }

}
