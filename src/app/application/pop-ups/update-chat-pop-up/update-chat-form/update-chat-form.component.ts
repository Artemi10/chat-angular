import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersToUpdate} from "../../users-to-update";
import {Chat} from "../../../../../models/chat.model";
import { ChatService } from 'src/services/chat/chat.service';
import {ErrorHandlerService} from "../../../../../services/error_handler/error-handler.service";
import {TokenService} from "../../../../../services/token/token.service";

@Component({
  selector: 'app-update-chat-form',
  templateUrl: './update-chat-form.component.html',
  styleUrls: ['./update-chat-form.component.css']
})
export class UpdateChatFormComponent implements OnInit{
  public updateChatForm: FormGroup;
  public errorMessage: string;
  @Input() chat: Chat | undefined;
  @Input() usersToUpdate: UsersToUpdate | undefined;
  @Output() closePopUpEvent: EventEmitter<any>;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService,
              private errorHandler: ErrorHandlerService, private tokenService: TokenService) {
    this.errorMessage = '';
    this.updateChatForm = new FormGroup({});
    this.updateChatForm = this.formBuilder.group({
      chatNameInput: this.formBuilder.group({
        chatName: new FormControl('', Validators.required)
      })
    });
    this.closePopUpEvent = new EventEmitter<any>();
  }

  ngOnInit() {
    // @ts-ignore
    this.updateChatForm.controls['chatNameInput'].controls['chatName'].setValue(this.chat?.name)
  }

  public get chatUserLogins(): string[]{
    if (this.usersToUpdate !== undefined){
      const currentUserLogin = this.tokenService.getUserLogin();
      return this.usersToUpdate.currentChatUserLogins
        .filter(login => login !== currentUserLogin);
    }
    return [];
  }

  private get newChatName(): string{
    return this.updateChatForm.value.chatNameInput.chatName;
  }

  public updateChat(){
    if (this.usersToUpdate !== undefined && this.chat !== undefined){
      const requestBody = {
        chatId: this.chat.id,
        chatName: this.newChatName,
        userLoginsToAdd: this.usersToUpdate.userLoginsToAdd,
        userLoginsToDelete: this.usersToUpdate.userLoginsToDelete
      };
      this.chatService.updateChat(requestBody)
        .subscribe(
          () => this.closePopUpEvent.emit(),
          error => {
            this.errorHandler.handleForbidden(error);
            this.errorMessage = 'Chat already has been created';
          });
    }
  }

  public deleteUser(login: string){
    if (this.usersToUpdate !== undefined){
      this.usersToUpdate.delete(login);
    }
  }
}
