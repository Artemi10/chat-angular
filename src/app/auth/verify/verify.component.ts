import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  public isPreloaderOpened: boolean = false;
  public errorMessage = '';
  public codeFrom: FormGroup = new FormGroup({});
  public isTimerShown: boolean = true;

  constructor(private auth: AuthService, private router: Router,
              private tokenService: TokenService) {
    this.codeFrom.addControl('code', new FormControl('', Validators.required));
  }

  public verify(): void {
    this.isPreloaderOpened = true;
    const codeDTO = {
      login : this.tokenService.getUserLogin(),
      code : this.codeFrom.value.code
    };
    this.auth.verifyCode(codeDTO)
      .subscribe(token => {
        this.tokenService.setToken(token);
        this.router.navigate(['/'])
          .then(() => this.isPreloaderOpened = false);
      }, error => {
        if (error.status === 401 || error.status === 403
          || error.status === 404){
          this.errorMessage = error.error;
        }
      });
  }

  public closeTimer(): void{
    this.isTimerShown = false;
  }
  public sendAgain(): void{
    this.errorMessage = '';
    this.auth.repeatCode()
      .subscribe(token => {
        this.tokenService.setToken(token);
        this.isTimerShown = true;
        this.errorMessage = '';
      }, error => {
        if (error.status === 401 || error.status === 403 || error.status === 404){
          this.errorMessage = error.error;
        }
      });
  }

}
