import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token/token.service';
import {environment} from "../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url !== `${environment.api}/auth/logIn` && request.url !== `${environment.api}/auth/signUp`){
      const token = this.tokenService.getToken()
      if (token !== ''){
        const clonedRequest = request.clone({headers: request.headers.append('Authorization', `Bearer_${token}`)});
        return next.handle(clonedRequest);
      }
    }
    return next.handle(request)
  }
}
