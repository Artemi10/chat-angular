import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(timerValue: number): string {
    if (timerValue > 9) return `00:${timerValue}`;
    else return `00:0${timerValue}`;
  }

}
