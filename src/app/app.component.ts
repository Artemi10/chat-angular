import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../services/message/message.service";
import {Message} from "../models/message.model";
import { LiveMessageService } from '../services/live_message/live-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isSearchPanelShown: boolean = false;

  constructor() {}

  public openSearchForm(): void{
    this.isSearchPanelShown = true;
  }
  public closeSearchForm(): void{
    this.isSearchPanelShown = false;
  }
}
