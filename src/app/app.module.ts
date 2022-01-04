import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppComponent } from './app.component';
import { HeaderComponent } from './application/chat/header/header.component';
import { MessagesComponent } from './application/chat/messages/messages.component';
import { MessageComponent } from './application/chat/messages/message/message.component';
import { InputMessageComponent } from './application/chat/input-message/input-message.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { PreloaderComponent } from './application/chat/preloader/preloader.component';
import { ChatComponent } from './application/chat/chat.component';
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
import { UserAccountComponent } from './application/user-account/user-account.component';
import { ApplicationComponent } from './application/application.component';
import { DatePipe } from '../pipes/date/date.pipe';
import { ChatsNavComponent } from './application/user-account/chats-nav/chats-nav.component';
import { CreateChatPopUpComponent } from './application/pop-ups/create-chat-pop-up/create-chat-pop-up.component';
import { FoundUserComponent } from './application/pop-ups/pop-up-components/search-panel/found-user/found-user.component';
import { SelectedUserComponent } from './application/pop-ups/pop-up-components/selected-user/selected-user.component';
import { LoginInputComponent } from './auth/form-components/login-input/login-input.component';
import { PasswordInputComponent } from './auth/form-components/password-input/password-input.component';
import { ErrorMessageComponent } from './auth/form-components/error-message/error-message.component';
import { SubmitButtonComponent } from './auth/form-components/submit-button/submit-button.component';
import { RefLinkComponent } from './auth/form-components/ref-link/ref-link.component';
import { EmailInputComponent } from './auth/form-components/email-input/email-input.component';
import { BirthDateInputComponent } from './auth/form-components/birth-date-input/birth-date-input.component';
import { RepasswordInputComponent } from './auth/form-components/repassword-input/repassword-input.component';
import { CodeInputComponent } from './auth/form-components/code-input/code-input.component';
import { CreateChatFormComponent } from './application/pop-ups/create-chat-pop-up/create-chat-form/create-chat-form.component';
import { ChatNameInputComponent } from './application/pop-ups/pop-up-components/chat-name-input/chat-name-input.component';
import { SearchPanelComponent } from './application/pop-ups/pop-up-components/search-panel/search-panel.component';
import { UpdateChatPopUpComponent } from './application/pop-ups/update-chat-pop-up/update-chat-pop-up.component';
import { UpdateChatFormComponent } from './application/pop-ups/update-chat-pop-up/update-chat-form/update-chat-form.component';

const appRoutes: Routes = [
  {path: '', component: ApplicationComponent, canActivate: [ChatGuard]},
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
    TimerPipe,
    UserAccountComponent,
    ApplicationComponent,
    DatePipe,
    ChatsNavComponent,
    CreateChatPopUpComponent,
    FoundUserComponent,
    FoundUserComponent,
    SelectedUserComponent,
    LoginInputComponent,
    PasswordInputComponent,
    ErrorMessageComponent,
    SubmitButtonComponent,
    RefLinkComponent,
    EmailInputComponent,
    BirthDateInputComponent,
    RepasswordInputComponent,
    CodeInputComponent,
    CreateChatFormComponent,
    ChatNameInputComponent,
    SearchPanelComponent,
    UpdateChatPopUpComponent,
    UpdateChatFormComponent
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

