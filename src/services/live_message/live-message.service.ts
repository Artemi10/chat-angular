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
    this.metadata = encodeAndAddWellKnownMetadata(Buffer.alloc(0), MESSAGE_RSOCKET_ROUTING, Buffer.from(String.fromCharCode("api.messages.stream".length) + "api.messages.stream"));
  }

  // @ts-ignore
  public createConnection(): void{
    const rSocket = this.createRSocketClient();
    this.openConnection(rSocket);
    this.rSocketClient = rSocket;
  }

  // @ts-ignore
  private createRSocketClient(): RSocketClient{
    return new RSocketClient({
      transport: new RSocketWebSocketClient({url: 'ws://localhost:8081/api/message/rsocket'}, BufferEncoders),
      setup: {
        payload : {
          data: Buffer.from(this.tokenService.getToken())
        },
        dataMimeType: 'application/json',
        metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
        keepAlive: 5000,
        lifetime: 60000,
      }
    });
  }

  // @ts-ignore
  private openConnection(client: RSocketClient): void{
    client.connect()
      .then((rsocket: any) => {
        rsocket.requestChannel(new Flowable(source => {
          source.onSubscribe({cancel: () => {}, request: n => {}})
          this.sendMessageSubject.subscribe((message: object) => {
            source.onNext({
              data: Buffer.from(JSON.stringify(message)),
              metadata: this.metadata
            });
          })
        })).subscribe({
          onSubscribe: (s: any) => s.request(1000),
          onError: (e: any) => this.rejectConnection()
        });

        rsocket.requestStream({metadata: this.metadata})
          .subscribe({
            onSubscribe: (s: any) => s.request(1000),
            onNext: (e: any) => this.messageSubscribe.next(JSON.parse(e.data))
        });
      });
  }

  public sendMessage(messageToSent: object): void{
    this.sendMessageSubject.next(messageToSent);
  }

  public closeConnection(): void{
    this.rSocketClient.close();
  }

  private rejectConnection(): void{
    this.rSocketClient.close();
    this.tokenService.removeToken();
    this.router.navigate(['/logIn']);
  }
}
