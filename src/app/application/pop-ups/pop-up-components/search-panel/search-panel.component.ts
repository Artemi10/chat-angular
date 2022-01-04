import {Component, Input, Output, EventEmitter} from '@angular/core';
import { User } from 'src/models/user.model';
import { ErrorHandlerService } from 'src/services/error_handler/error-handler.service';
import {Chat} from "../../../../../models/chat.model";
import {UserService} from "../../../../../services/user/user.service";

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent {
  public users: User[];
  public name: string;
  private pageNumber: number;
  private isScrolledDown: boolean;
  private readonly pageSize: number;
  @Input() selectedUserLogins: Set<string> | undefined;
  @Output() selectUserEvent: EventEmitter<string>;

  constructor(private userService: UserService, private errorHandler: ErrorHandlerService) {
    this.users = [];
    this.name = '';
    this.pageNumber = 0;
    this.pageSize = 10;
    this.isScrolledDown = false;
    this.selectUserEvent = new EventEmitter<string>();
  }

  public get isUsersEmpty(): boolean {
    return this.users.length === 0;
  }

  public updateUsersList(){
    this.pageNumber = 0;
    this.userService.getUserByPattern(this.name, this.pageNumber, this.pageSize)
      .subscribe(
        users => this.users = users,
        error => this.errorHandler.handleForbidden(error));
  }

  public isUserSelected(login: string): boolean{
    if (this.selectedUserLogins !== undefined){
      return this.selectedUserLogins.has(login);
    }
    return false;
  }

  public selectUser(login: string) {
    this.selectUserEvent.emit(login);
  }

  public scrolledEventListener(){
    if (!this.isScrolledDown){
      this.pageNumber++;
      this.userService.getUserByPattern(this.name, this.pageNumber, this.pageSize)
        .subscribe(
          users => {
            this.users = this.users.concat(users);
            if (users.length === 0) {
              this.isScrolledDown = true;
            }
          },
          error => this.errorHandler.handleForbidden(error));
    }
  }

}
