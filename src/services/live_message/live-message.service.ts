import {Injectable, OnDestroy} from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class LiveMessageService implements OnDestroy {
  // @ts-ignore
  private client: RSocketClient = null;
  private sendMessageSubject: Subject<object> = new Subject<object>();
  public messageSubscribe: Subject<Message> = new Subject<Message>();

  constructor() {
    this.client = LiveMessageService.createRSocketClient();
    this.openConnection();
  }
  // @ts-ignore
  private static createRSocketClient(): RSocketClient{
    return new RSocketClient({
      transport: new RSocketWebSocketClient({url: 'ws://localhost:8081/api/message/rsocket',}, BufferEncoders),
      setup: {
        dataMimeType: 'application/json',
        metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
        keepAlive: 5000,
        lifetime: 60000,
      }
    });
  }
  private openConnection(): void{
    this.client.connect()
      .then((rsocket: any) => {
        const endpoint = "api.messages.stream";
        rsocket.requestChannel(new Flowable(source => {
          source.onSubscribe({cancel: () => {}, request: n => {}})
          this.sendMessageSubject.subscribe((message: object) => {
            source.onNext({
              data: Buffer.from(JSON.stringify(message)),
              metadata: encodeAndAddWellKnownMetadata(Buffer.alloc(0), MESSAGE_RSOCKET_ROUTING, Buffer.from(String.fromCharCode(endpoint.length) + endpoint))
            });
          }, error => console.log(error))
        })).subscribe({onSubscribe: (s: any) => s.request(1000)});

        rsocket.requestStream({
          metadata: encodeAndAddWellKnownMetadata(Buffer.alloc(0), MESSAGE_RSOCKET_ROUTING, Buffer.from(String.fromCharCode(endpoint.length) + endpoint))
        }).subscribe({
          onSubscribe: (s: any) => s.request(1000),
          onNext: (e: any) => this.messageSubscribe.next(JSON.parse(e.data))
        });
      });
  }

  public sendMessage(messageToSent: object): void{
    this.sendMessageSubject.next(messageToSent);
  }

  ngOnDestroy(): void {
    this.client.close();
  }
}
