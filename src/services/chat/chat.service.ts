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
  private _currentChat: Chat | undefined;
  private _currentChatChangedEvent: Subject<Chat>;
  private _newChatCreatedEvent: Subject<Chat>;
  private _chatUpdatedEvent: Subject<Chat>;

  constructor(private http: HttpClient, private tokenService: TokenService,
              private chatConverter: XmlChatConverter) {
    this._newChatCreatedEvent = new Subject<Chat>();
    this._currentChatChangedEvent = new Subject<Chat>();
    this._chatUpdatedEvent = new Subject<Chat>();
  }

  public set currentChat(newChat: Chat | undefined){
    if (newChat !== undefined){
      this._currentChat = newChat;
      this._currentChatChangedEvent.next(newChat);
    }
  }

  public get currentChat(): Chat | undefined{
    return this._currentChat;
  }

  public get chatUpdatedEvent(): Observable<Chat>{
    return this._chatUpdatedEvent.asObservable();
  }

  public get newChatCreatedEvent(): Observable<Chat>{
    return this._newChatCreatedEvent.asObservable();
  }

  public get currentChatChangedEvent(): Observable<Chat>{
    return this._currentChatChangedEvent.asObservable();
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

  public createChat(chatName: string, userNames: string[]): Observable<void>{
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
        map(resp => this.chatConverter.convert(resp, 'ns2:chat')),
        map(chat => this._newChatCreatedEvent.next(chat))
      );
  }

  public updateChatName(id: number, newName: string): Observable<void>{
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
      {headers: {'Content-Type': 'text/xml'}, responseType : 'text' })
      .pipe(
        map(resp => this.chatConverter.convert(resp, 'ns2:chat')),
        map(chat => this._chatUpdatedEvent.next(chat))
      );
  }

  public updateChat(requestBody: ChatToUpdate): Observable<void>{
    const header = this.tokenService.getTokenHeader();
    const userLoginsToAddBody = requestBody.userLoginsToAdd
      .map(login => `<gs:userLoginsToAdd>${login}</gs:userLoginsToAdd>`).join('')
    const userLoginsToDeleteBody = requestBody.userLoginsToDelete
      .map(login => `<gs:userLoginsToDelete>${login}</gs:userLoginsToDelete>`).join('')
    const body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:gs="http://spring.io/guides/gs-producing-web-service">' +
      `   <soapenv:Header>${header}</soapenv:Header>` +
      '   <soapenv:Body>' +
      '      <gs:updateChatRequest>' +
      `         <gs:chatId>${requestBody.chatId}</gs:chatId>` +
      `         <gs:newChatName>${requestBody.chatName}</gs:newChatName>` +
                  userLoginsToAddBody + userLoginsToDeleteBody +
      '      </gs:updateChatRequest>\n' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
    return this.http.post(`${environment.api}/account`, body,
      {headers: {'Content-Type': 'text/xml'}, responseType : 'text' })
      .pipe(
        map(resp => this.chatConverter.convert(resp, 'ns2:chat')),
        map(chat => {
          this._chatUpdatedEvent.next(chat);
          this.currentChat = chat;
        })
      );
  }
}

export interface ChatToUpdate{
  chatId: number,
  chatName: string,
  userLoginsToAdd: string[],
  userLoginsToDelete: string[]
}
