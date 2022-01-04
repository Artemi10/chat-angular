import {Component, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../../../../../../models/user.model";

@Component({
  selector: 'app-found-user',
  templateUrl: './found-user.component.html',
  styleUrls: ['./found-user.component.css']
})
export class FoundUserComponent {
  @Input() user: User | undefined;
  @Input() isSelected: boolean;
  private isHovered: boolean;
  @Output() selectUserListener: EventEmitter<string>;

  constructor() {
    this.isSelected = false;
    this.isHovered = false;
    this.selectUserListener = new EventEmitter<string>();
  }

  public get isSelectedIconInvisible(): boolean{
    return !this.isSelected;
  }

  public get isSelectedIconHidden(): boolean{
    return this.isHovered && !this.isSelected;
  }

  public get isAddIconHidden(): boolean{
    return this.isSelected || !this.isHovered;
  }

  public mouseEnterListener(){
    this.isHovered = true;
  }

  public mouseLeaveListener(){
    this.isHovered = false;
  }

  public clickAddIconListener(){
    this.selectUserListener.emit(this.user?.login);
  }
}
