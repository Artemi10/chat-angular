import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "../token/token.service";
import { Chat } from 'src/models/chat.model';
import {Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment";
import {XmlChatConverter} from "../converter/chat/xml-chat-converter.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public currentChat: Chat | undefined;
  public newChatCreatedEvent: Subject<Chat>;
  public currentChatChangedEvent: Subject<Chat>;

  constructor(private http: HttpClient, private tokenService: TokenService,
              private chatConverter: XmlChatConverter) {
    this.newChatCreatedEvent = new Subject<Chat>();
    this.currentChatChangedEvent = new Subject<Chat>();
  }

  public getChatByName(name: String): Observable<Chat>{
    const header = this.tokenService.getTokenHeader();
    const body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:gs="http://spring.io/guides/gs-producing-web-service">' +
      `   <soapenv:Header>${header}</soapenv:Header>` +
      '   <soapenv:Body>' +
      '      <gs:getChatByNameRequest>' +
      `         <gs:chatName>${name}</gs:chatName>` +
      '      </gs:getChatByNameRequest>' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
    return this.http.post(`${environment.api}/account`, body,
      {headers: {'Content-Type': 'text/xml'}, responseType : 'text' })
      .pipe(map(resp => this.chatConverter.convert(resp, 'ns2:chat')));
  }

  public getUserChats(page: number, size: number): Observable<Chat[]>{
    const header = this.tokenService.getTokenHeader();
    const body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:gs="http://spring.io/guides/gs-producing-web-service">' +
      `   <soapenv:Header>${header}</soapenv:Header>` +
      '   <soapenv:Body>' +
      '     <gs:getUserChatsRequest>' +
      `        <gs:page>${page}</gs:page>` +
      `        <gs:size>${size}</gs:size>` +
      '     </gs:getUserChatsRequest>' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
    return this.http.post(`${environment.api}/account`, body,
      {headers: {'Content-Type': 'text/xml'}, responseType : 'text'})
      .pipe(map(resp => this.chatConverter.convertList(resp, 'ns2:chats')));
  }

  public createChat(chatName: string, userNames: string[]): Observable<Chat>{
    const header = this.tokenService.getTokenHeader();
    const userNamesXML = userNames
      .map(name => `<gs:userNames>${name}</gs:userNames>`)
      .reduce((acc, xml) => acc + xml);
    const body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:gs="http://spring.io/guides/gs-producing-web-service">' +
      `   <soapenv:Header>${header}</soapenv:Header>` +
      '   <soapenv:Body>' +
      '      <gs:createChatRequest>' +
      `         <gs:chatName>${chatName}</gs:chatName>` +
      `         ${userNamesXML}` +
      '      </gs:createChatRequest>' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
    return this.http.post(`${environment.api}/account`, body,
      {headers: {'Content-Type': 'text/xml'}, responseType : 'text'})
      .pipe(
        map(resp => this.chatConverter.convert(resp, 'ns2:chat'))
      );
  }

  public deleteUserFromChat(chatName: string, userName: string): Observable<string>{
    const header = this.tokenService.getTokenHeader();
    const body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:gs="http://spring.io/guides/gs-producing-web-service">' +
      `   <soapenv:Header>${header}</soapenv:Header>` +
      '   <soapenv:Body>' +
      '      <gs:deleteUserFromChatRequest>' +
      `         <gs:chatName>${chatName}</gs:chatName>` +
      `         <gs:userName>${userName}</gs:userName>` +
      '      </gs:deleteUserFromChatRequest>' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
    return this.http.post(`${environment.api}/account`, body,
      {headers: {'Content-Type': 'text/xml'}, responseType : 'text' });
  }

  public addUserToChat(chatName: string, userName: string): Observable<string>{
    const header = this.tokenService.getTokenHeader();
    const body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:gs="http://spring.io/guides/gs-producing-web-service">' +
      `   <soapenv:Header>${header}</soapenv:Header>` +
      '   <soapenv:Body>' +
      '      <gs:addUserToChatRequest>' +
      `         <gs:chatName>${chatName}</gs:chatName>` +
      `         <gs:userName>${userName}</gs:userName>` +
      '      </gs:addUserToChatRequest>' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
    return this.http.post(`${environment.api}/account`, body,
      {headers: {'Content-Type': 'text/xml'}, responseType : 'text' });
  }

  public updateChatName(id: number, newName: string): Observable<string>{
    const header = this.tokenService.getTokenHeader();
    const body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:gs="http://spring.io/guides/gs-producing-web-service">' +
      `   <soapenv:Header>${header}</soapenv:Header>` +
      '   <soapenv:Body>' +
      '      <gs:updateChatNameRequest>' +
      `         <gs:id>${id}</gs:id>` +
      `         <gs:newChatName>${newName}</gs:newChatName>` +
      '      </gs:updateChatNameRequest>\n' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
    return this.http.post(`${environment.api}/account`, body,
      {headers: {'Content-Type': 'text/xml'}, responseType : 'text' });
  }

  public newChatCreated(newChat: Chat){
    this.newChatCreatedEvent.next(newChat);
  }

  public changeCurrentChat(newChat: Chat){
    this.currentChat = newChat;
    this.currentChatChangedEvent.next(newChat);
  }

}
