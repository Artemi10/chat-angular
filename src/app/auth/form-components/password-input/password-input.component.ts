import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";
import {isInputInvalid} from "../../utils/utils";

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements OnInit {
  public passwordFormGroup: FormGroup | null;
  public password: string;

  constructor(private controlContainer: ControlContainer) {
    this.passwordFormGroup = null;
    this.password = '';
  }

  ngOnInit(): void {
    // @ts-ignore
    this.passwordFormGroup = this.controlContainer.control;
  }

  public get isInputInvalid(): boolean {
    if (this.passwordFormGroup != null){
      return isInputInvalid(this.passwordFormGroup, 'password');
    }
    return false;
  }
}
