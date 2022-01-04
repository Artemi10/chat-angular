import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup} from "@angular/forms";
import {isInputInvalid} from "../../utils/utils";

@Component({
  selector: 'app-repassword-input',
  templateUrl: './repassword-input.component.html',
  styleUrls: ['./repassword-input.component.css']
})
export class RepasswordInputComponent implements OnInit {
  public repasswordFormGroup: FormGroup | null;

  constructor(private controlContainer: ControlContainer) {
    this.repasswordFormGroup = null;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.repasswordFormGroup = this.controlContainer.control;
  }

  public get isInputInvalid(): boolean {
    if (this.repasswordFormGroup != null){
      return isInputInvalid(this.repasswordFormGroup, 'repassword');
    }
    return false;
  }
}
