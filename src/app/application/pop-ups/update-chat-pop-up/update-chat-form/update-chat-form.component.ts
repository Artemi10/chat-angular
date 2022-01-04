import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-chat-form',
  templateUrl: './update-chat-form.component.html',
  styleUrls: ['./update-chat-form.component.css']
})
export class UpdateChatFormComponent implements OnInit{
  public updateChatForm: FormGroup;
  public errorMessage: string;
  @Input() chatName: string | undefined;
  @Input() selectedUserLogins: Set<string> | undefined;
  @Output() public closePopUpEvent: EventEmitter<any>;

  constructor(private formBuilder: FormBuilder) {
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
    this.updateChatForm.controls['chatNameInput'].controls['chatName'].setValue(this.chatName)
  }

  private get newChatName(): string{
    return this.updateChatForm.value.chatNameInput.chatName;
  }

  //TODO
  public updateChat(){

  }

  public deleteSelectedUser(login: string){
    if (this.selectedUserLogins !== undefined){
      this.selectedUserLogins.delete(login);
    }
  }
}
