import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";
import {isInputInvalid} from "../../utils/utils";

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent implements OnInit {
  public emailFormGroup: FormGroup | null;

  constructor(private controlContainer: ControlContainer) {
    this.emailFormGroup = null;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.emailFormGroup = this.controlContainer.control;
  }

  public get isInputInvalid(): boolean {
    if (this.emailFormGroup != null){
      return isInputInvalid(this.emailFormGroup, 'email');
    }
    return false;
  }
}
