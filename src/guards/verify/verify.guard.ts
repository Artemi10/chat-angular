import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.tokenService.isTokenExists()){
      const userState = this.tokenService.getUserState()
      if (userState === 'UNVERIFIED' && !this.tokenService.isExpired()) {
        return true
      }
      else {
        this.router.navigate(['/logIn'])
        return false
      }
    }
    else {
      this.router.navigate(['/logIn'])
      return false
    }
  }

}
