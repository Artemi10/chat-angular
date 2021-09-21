import { Injectable } from '@angular/core';
import {TokenService} from "../token/token.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private tokenService: TokenService, private router: Router) { }

  public handleForbidden(error: any){
    if (error.code === 401 || error.code === 403) {
      this.tokenService.removeToken()
      this.router.navigate(['/logIn'])
    }
  }
}
