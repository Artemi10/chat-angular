import { Injectable } from '@angular/core';
import {Chat} from "../../../models/chat.model";
import {AbstractXmlConverter} from "../xml-converter.service";
import {XmlUserConverter} from "../user/xml-user-converter.service";

@Injectable({
  providedIn: 'root'
})
export class XmlChatConverter extends AbstractXmlConverter<Chat>{

  constructor(private userConverterService: XmlUserConverter) {super();}

  public createEntity(body: Element | null): Chat {
    // @ts-ignore
    const id = Number.parseInt(body.getElementsByTagName('ns2:id').item(0).innerHTML);
    // @ts-ignore
    const name = body.getElementsByTagName('ns2:name').item(0).innerHTML;
    // @ts-ignore
    const admin = this.userConverterService.createEntity(body.getElementsByTagName('ns2:admin').item(0));
    // @ts-ignore
    const users = this.userConverterService.createEntities(body.getElementsByTagName('ns2:users'));
    return new Chat(id, name, admin, users);
  }
}
