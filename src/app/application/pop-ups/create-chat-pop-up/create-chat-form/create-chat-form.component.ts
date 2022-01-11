import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../../../../services/chat/chat.service";
import {LiveMessageService} from "../../../../../services/live_message/live-message.service";
import {ErrorHandlerService} from "../../../../../services/error_handler/error-handler.service";
import {UsersToUpdate} from "../../users-to-update";

@Component({
  selector: 'app-create-chat-form',
  templateUrl: './create-chat-form.component.html',
  styleUrls: ['./create-chat-form.component.css']
})
export class CreateChatFormComponent {
  public createChatForm: FormGroup;
  public errorMessage: string;
  @Input() usersToUpdate: UsersToUpdate | undefined;
  @Output() closePopUpEvent: EventEmitter<any>;

  constructor(private chatService: ChatService, private liveMessageService: LiveMessageService,
              private errorHandler: ErrorHandlerService, private formBuilder: FormBuilder) {
    this.errorMessage = '';
    this.createChatForm = new FormGroup({});
    this.createChatForm = this.formBuilder.group({
      chatNameInput: this.formBuilder.group({
        chatName: new FormControl('', Validators.required)
      })
    });
    this.closePopUpEvent = new EventEmitter<any>();
  }

  private get chatName(): string{
    return this.createChatForm.value.chatNameInput.chatName;
  }

  public createChat(){
    if (this.usersToUpdate !== undefined){
      this.chatService.createChat(this.chatName, this.usersToUpdate.currentChatUserLogins)
        .subscribe(() => {
            this.closePopUpEvent.emit();
            this.liveMessageService.refreshConnection();
          },
          error => {
            this.errorHandler.handleForbidden(error);
            this.errorMessage = 'Chat already has been created';
          })
    }
  }

  public deleteSelectedUser(login: string){
    if (this.usersToUpdate !== undefined){
      this.usersToUpdate.delete(login);
    }
  }
}
