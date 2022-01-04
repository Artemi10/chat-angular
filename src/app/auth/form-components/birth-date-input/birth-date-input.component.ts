import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";
import {isInputInvalid} from "../../utils/utils";
import {dateParser} from "../../../../services/utils/date-utils.service";

@Component({
  selector: 'app-birth-date-input',
  templateUrl: './birth-date-input.component.html',
  styleUrls: ['./birth-date-input.component.css']
})
export class BirthDateInputComponent implements OnInit, AfterViewInit {
  public birthDateFormGroup: FormGroup | null;
  @ViewChild('datepicker') private datepicker: ElementRef | undefined;

  constructor(private controlContainer: ControlContainer) {
    this.birthDateFormGroup = null;
  }

  ngOnInit() {
    // @ts-ignore
    this.birthDateFormGroup = this.controlContainer.control;
  }

  ngAfterViewInit() {
    // @ts-ignore
    let nativeElement = this.datepicker?.nativeElement
    const options = {
      i18n: {
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        weekdaysAbbrev:	['S', 'M','T','W','T','F','S'],
      },
      format: 'dd-mm-yyyy',
      onSelect : (element: Date) =>
        this.birthDateFormGroup!.patchValue({birthDate: dateParser(element)})
    }
    // @ts-ignore
    M.Datepicker.init(nativeElement, options);
  }

  public get isInputInvalid(): boolean {
    if (this.birthDateFormGroup != null){
      return isInputInvalid(this.birthDateFormGroup, 'birthDate');
    }
    return false;
  }
}
