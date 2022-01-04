import {Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {
  @Input() errorMessage: string | undefined;

  constructor() { }

  public get isHidden(): boolean {
    return this.errorMessage == '';
  }
}
