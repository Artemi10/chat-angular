import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Message} from "../../models/message.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  public getLatestMessages(chatId: number): Observable<Message[]> {
    const headers = new HttpHeaders({'Chat': String(chatId)})
    return this.httpClient.get<Message[]>(`${environment.api}/message`, {headers : headers});
  }

  public getNextLatestMessages(skipAmount: number, chatId: number): Observable<Message[]> {
    const headers = new HttpHeaders({'Chat': String(chatId)})
    return this.httpClient.get<Message[]>(`${environment.api}/message/skip/${skipAmount}`, {headers : headers});
  }

  public getMessagesByPhrase(phrase: string, chatId: number): Observable<Message[]> {
    const headers = new HttpHeaders({'Chat': String(chatId)})
    return this.httpClient.get<Message[]>(`${environment.api}/message/find/${phrase}`, {headers : headers});
  }
}
