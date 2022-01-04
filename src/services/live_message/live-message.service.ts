import {Injectable} from '@angular/core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import {
  BufferEncoders,
  encodeAndAddWellKnownMetadata,
  MESSAGE_RSOCKET_COMPOSITE_METADATA,
  MESSAGE_RSOCKET_ROUTING,
  RSocketClient
} from "rsocket-core";
import {Subject} from "rxjs";
import {Message} from "../../models/message.model";
import {Flowable} from "rsocket-flowable";
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LiveMessageService {
  // @ts-ignore
  private rSocketClient: RSocketClient;
  private sendMessageSubject: Subject<object>;
  public messageSubscribe: Subject<Message>;
  private metadata: Buffer;

  constructor(private tokenService: TokenService, private router: Router) {
    this.sendMessageSubject = new Subject<object>();
    this.messageSubscribe = new Subject<Message>();
    this.metadata = encodeAndAddWellKnownMetadata(
      Buffer.alloc(0), MESSAGE_RSOCKET_ROUTING,
      Buffer.from(String.fromCharCode("api.messages.stream".length) + "api.messages.stream"));
    this.rSocketClient = this.createRSocketClient();
    this.openConnection();
  }

  // @ts-ignore
  private createRSocketClient(): RSocketClient{
    const payloadData = { token: this.tokenService.getToken() };
    return new RSocketClient({
      transport: new RSocketWebSocketClient({url: 'ws://localhost:8081/api/message/rsocket'}, BufferEncoders),
      setup: {
        payload : {
          data: Buffer.from(JSON.stringify(payloadData))
        },
        dataMimeType: 'application/json',
        metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
        keepAlive: 5000,
        lifetime: 60000,
      }
    });
  }

  // @ts-ignore
  private openConnection() {
    this.rSocketClient.connect()
      .then((socket: any) => {
        socket.requestChannel(new Flowable(source => {
          source.onSubscribe({cancel: () => {}, request: n => {}})
          this.sendMessageSubject.subscribe((message: object) => {
            source.onNext({
              data: Buffer.from(JSON.stringify(message)),
              metadata: this.metadata
            });
          })
        })).subscribe({
          onSubscribe: (s: any) => s.request(1000)
        });

        const payloadData = { token: this.tokenService.getToken() };
        socket.requestStream({data: Buffer.from(JSON.stringify(payloadData)), metadata: this.metadata})
          .subscribe({
            onSubscribe: (s: any) => s.request(1000),
            onNext: (e: any) => this.messageSubscribe.next(JSON.parse(e.data))
        });
      });
  }

  public sendMessage(messageContent: string, chatId: number) {
    const token = this.tokenService.getToken();
    const login = this.tokenService.getUserLogin();
    const data = {
      message : new Message(login, messageContent, chatId), token
    };
    this.sendMessageSubject.next(data);
  }

  public refreshConnection() {
    this.rSocketClient.close();
    this.rSocketClient = this.createRSocketClient();
    this.openConnection();
  }

  public rejectConnection() {
    this.tokenService.removeToken();
    this.router.navigate(['/logIn']);
  }
}
