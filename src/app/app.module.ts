import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppComponent } from './app.component';
import { HeaderComponent } from './chat/header/header.component';
import { MessagesComponent } from './chat/messages/messages.component';
import { MessageComponent } from './chat/messages/message/message.component';
import { InputMessageComponent } from './chat/input-message/input-message.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { PreloaderComponent } from './chat/preloader/preloader.component';
import { ChatComponent } from './chat/chat.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth/auth.guard";
import { ChatGuard } from "../guards/chat/chat.guard";
import { VerifyGuard } from "../guards/verify/verify.guard";
import { TokenInterceptor } from "../interceptors/token/token.interceptor";
import { TimerComponent } from './auth/verify/timer/timer.component';
import { TimerPipe } from '../pipes/timer/timer.pipe';

const appRoutes: Routes = [
  {path: '', component: ChatComponent, canActivate: [ChatGuard]},
  {path: 'logIn', component: LogInComponent, canActivate: [AuthGuard]},
  {path: 'signUp', component: SignUpComponent, canActivate: [AuthGuard]},
  {path: 'verify', component: VerifyComponent, canActivate: [VerifyGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MessagesComponent,
    MessageComponent,
    InputMessageComponent,
    PreloaderComponent,
    ChatComponent,
    LogInComponent,
    SignUpComponent,
    VerifyComponent,
    TimerComponent,
    TimerPipe
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        InfiniteScrollModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

