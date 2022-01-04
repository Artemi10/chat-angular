import { Pipe, PipeTransform } from '@angular/core';
import {dateParser} from "../../services/utils/date-utils.service";

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: Date | undefined): string {
    if (date != undefined) {
      return dateParser(date);
    }
    return '';
  }

}
