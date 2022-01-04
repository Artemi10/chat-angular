import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";
import { isInputInvalid } from 'src/app/auth/utils/utils';


@Component({
  selector: 'app-chat-name-input',
  templateUrl: './chat-name-input.component.html',
  styleUrls: ['./chat-name-input.component.css']
})
export class ChatNameInputComponent implements OnInit {
  public chatNameFormGroup: FormGroup | null;
  @Input() isActive: boolean;

  constructor(private controlContainer: ControlContainer) {
    this.isActive = false;
    this.chatNameFormGroup = null;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.chatNameFormGroup = this.controlContainer.control;
  }

  public get isInputInvalid(): boolean {
    if (this.chatNameFormGroup != null){
      return isInputInvalid(this.chatNameFormGroup, 'chatName');
    }
    return false;
  }
}
