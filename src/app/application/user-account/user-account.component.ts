import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/user.model";
import {ErrorHandlerService} from "../../../services/error_handler/error-handler.service";
import {PopUpType} from '../pop-ups/pop-ups';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent {
  @Output() public closeUserAccountEvent: EventEmitter<PopUpType>;
  @Input() public isUserAccountOpened: boolean | undefined;
  public user: User | undefined;

  constructor(private userService: UserService, private errorHandler: ErrorHandlerService) {
    this.closeUserAccountEvent = new EventEmitter<PopUpType>();
    this.userService.getUser()
      .subscribe(
        user => this.user = user,
        error => this.errorHandler.handleForbidden(error)
      );
  }

  public closeUserAccount() {
    this.closeUserAccountEvent.emit(PopUpType.USER_ACCOUNT);
  }
}
