import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";
import {isInputInvalid} from "../../utils/utils";

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.css']
})
export class LoginInputComponent implements OnInit{
  public loginFormGroup: FormGroup | null;

  constructor(private controlContainer: ControlContainer) {
   this.loginFormGroup = null;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.loginFormGroup = this.controlContainer.control;
  }

  public get isInputInvalid(): boolean {
    if (this.loginFormGroup != null){
      return isInputInvalid(this.loginFormGroup, 'login');
    }
    return false;
  }
}
