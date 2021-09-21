import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.isTokenExists()){
      const userState = this.tokenService.getUserState()
      if (userState !== 'UNVERIFIED' && !this.tokenService.isExpired()) {
        this.router.navigate(['/'])
        return false
      }
      else return true
    }
    else return true
  }

}
