import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../../../../services/chat/chat.service";
import {LiveMessageService} from "../../../../../services/live_message/live-message.service";
import {ErrorHandlerService} from "../../../../../services/error_handler/error-handler.service";

@Component({
  selector: 'app-create-chat-form',
  templateUrl: './create-chat-form.component.html',
  styleUrls: ['./create-chat-form.component.css']
})
export class CreateChatFormComponent {
  public createChatForm: FormGroup;
  public errorMessage: string;
  @Input() selectedUserLogins: Set<string> | undefined;
  @Output() public closePopUpEvent: EventEmitter<any>;

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
    if (this.selectedUserLogins !== undefined){
      this.chatService.createChat(this.chatName, [...this.selectedUserLogins])
        .subscribe(
          chat => {
            this.chatService.newChatCreated(chat);
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
    if (this.selectedUserLogins !== undefined){
      this.selectedUserLogins.delete(login);
    }
  }
}
