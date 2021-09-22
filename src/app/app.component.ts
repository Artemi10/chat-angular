import { Component, OnDestroy } from '@angular/core';
import { LiveMessageService } from 'src/services/live_message/live-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  public isSearchPanelShown: boolean = false;

  constructor(private liveMessageService: LiveMessageService) {}

  public openSearchForm(): void{
    this.isSearchPanelShown = true;
  }
  public closeSearchForm(): void{
    this.isSearchPanelShown = false;
  }

  ngOnDestroy(): void {
    this.liveMessageService.closeConnection();
  }


}
