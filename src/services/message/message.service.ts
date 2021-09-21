import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Message} from "../../models/message.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  public getLatestMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${environment.api}/message`);
  }

  public getNextLatestMessages(skipAmount: number): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${environment.api}/message/skip/${skipAmount}`);
  }

  public getMessagesByPhrase(phrase: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${environment.api}/message/find/${phrase}`);
  }
}
