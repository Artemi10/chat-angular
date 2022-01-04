import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { TokenService } from '../../../services/token/token.service';
import {handleError} from "../utils/utils";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  public isPreloaderOpened: boolean;
  public errorMessage: string;
  public isTimerShown: boolean;
  public codeFrom: FormGroup;

  constructor(private auth: AuthService, private router: Router,
              private tokenService: TokenService, private formBuilder: FormBuilder) {
    this.isPreloaderOpened = false;
    this.errorMessage = '';
    this.isTimerShown = true;
    this.codeFrom = formBuilder.group({
      codeInput: this.formBuilder.group({
        code: new FormControl('', Validators.required)
      })
    });
  }

  public verify(): void {
    this.isPreloaderOpened = true;
    this.auth.verifyCode(this.requestBody)
      .subscribe(
        token => {
          this.tokenService.setToken(token);
          this.router.navigate(['/'])
            .then(() => this.isPreloaderOpened = false);
      },
        error => {
          error.message = handleError(error);
          this.isPreloaderOpened = false;
      });
  }

  private get requestBody(): object{
    const formValue = this.codeFrom.value;
    return  {
      login : this.tokenService.getUserLogin(),
      code : formValue.codeInput.code
    }
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
        error.message = handleError(error);
        this.isPreloaderOpened = false;
      });
  }

}
