import { Injectable } from '@angular/core';
import {TokenService} from "../token/token.service";
import {Router} from "@angular/router";
import {ErrorConverterService} from "../converter/error/error-converter.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private tokenService: TokenService, private router: Router,
              private converter: ErrorConverterService) { }

  public handleForbidden(error: any){
    const errorMsg = this.converter.getErrorMessage(error.error, 'faultstring');
    if (error.code === 401 || error.code === 403 || errorMsg == 'Auth message: Not permit') {
      this.tokenService.removeToken()
      this.router.navigate(['/logIn'])
    }
  }
}
