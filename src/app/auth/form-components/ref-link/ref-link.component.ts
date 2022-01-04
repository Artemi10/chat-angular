import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-ref-link',
  templateUrl: './ref-link.component.html',
  styleUrls: ['./ref-link.component.css']
})
export class RefLinkComponent {
  @Input() name: string | undefined;
  @Input() refLink: string | undefined;

  constructor() { }
}
