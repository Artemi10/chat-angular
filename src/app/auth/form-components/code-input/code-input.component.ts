import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";
import {isInputInvalid} from "../../utils/utils";

@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.css']
})
export class CodeInputComponent implements OnInit {
  public codeFormGroup: FormGroup | null;

  constructor(private controlContainer: ControlContainer) {
    this.codeFormGroup = null;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.codeFormGroup = this.controlContainer.control;
  }

  public get isInputInvalid(): boolean {
    if (this.codeFormGroup != null){
      return isInputInvalid(this.codeFormGroup, 'code');
    }
    return false;
  }
}
