import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorConverterService {

  constructor() {}

  public getErrorMessage(xml: string, tagName: string): string {
    const parser = new DOMParser();
    const element =  <Element> parser.parseFromString(xml, "application/xml")
      .getElementsByTagName(tagName).item(0);
    return element.innerHTML;
  }
}
