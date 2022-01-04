import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-selected-user',
  templateUrl: './selected-user.component.html',
  styleUrls: ['./selected-user.component.css']
})
export class SelectedUserComponent {
  public isHovered: boolean;
  @Input() login: string;
  @Output() deleteUserListener: EventEmitter<string>;

  constructor() {
    this.login = '';
    this.isHovered = false;
    this.deleteUserListener = new EventEmitter<string>();
  }

  public mouseEnterListener(){
    this.isHovered = true;
  }
  public mouseLeaveListener(){
    this.isHovered = false;
  }
  public clickDeleteIconListener(){
    this.deleteUserListener.emit(this.login);
  }
}
