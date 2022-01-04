import { Injectable } from '@angular/core';
import {User} from "../../../models/user.model";
import {AbstractXmlConverter} from "../xml-converter.service";

@Injectable({
  providedIn: 'root'
})
export class XmlUserConverter extends AbstractXmlConverter<User>{

  constructor() { super(); }

  public createEntity(body: Element | null): User {
    // @ts-ignore
    const id = Number.parseInt(body.getElementsByTagName('ns2:id').item(0).innerHTML);
    // @ts-ignore
    const login = body.getElementsByTagName('ns2:login').item(0).innerHTML;
    // @ts-ignore
    const birthDateStr = body.getElementsByTagName('ns2:birthDate')
      .item(0).innerHTML.split('+')[0];
    return new User(id, login, new Date(birthDateStr));
  }
}
