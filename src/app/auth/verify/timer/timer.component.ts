import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  public seconds: number;
  @Output() public timerFinishEvent: EventEmitter<any>;

  constructor() {
    this.seconds = 59;
    this.timerFinishEvent = new EventEmitter();
  }

  ngOnInit(): void {
    this.startTimer();
  }

  private startTimer(): void{
    setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      }
      else {
        this.timerFinishEvent.emit();
      }
    }, 1000);
  }

}
