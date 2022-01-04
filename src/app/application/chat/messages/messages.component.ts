import {Component, Input } from '@angular/core';
import {Message} from "../../../../models/message.model";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent{
  @Input() messages: Message[];

  constructor() {
    this.messages = [];
  }
}
