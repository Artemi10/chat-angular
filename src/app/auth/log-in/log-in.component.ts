import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { TokenService } from '../../../services/token/token.service';
import { handleError } from '../utils/utils';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  public logInForm: FormGroup;
  public errorMessage: string;
  public isPreloaderOpened: boolean;

  constructor(private auth: AuthService, private tokenService: TokenService,
              private router: Router, private formBuilder: FormBuilder) {
    this.errorMessage = '';
    this.isPreloaderOpened = false;
    this.logInForm = formBuilder.group({
      passwordInput: this.formBuilder.group({
        password:  new FormControl('', Validators.required)
      }),
      loginInput: this.formBuilder.group({
        login:  new FormControl('', Validators.required)
      })
    });
  }

  public logIn() {
    this.isPreloaderOpened = true;
    this.errorMessage = '';
    this.auth.logIn(this.requestBody)
      .subscribe(
        token => {
          this.tokenService.setToken(token);
          this.router.navigate(['/verify'])
            .then(() => this.isPreloaderOpened = false);
          },
        error => {
          this.errorMessage = handleError(error);
          this.isPreloaderOpened = false;
      });
  }

  private get requestBody(): object{
    const formValue = this.logInForm.value;
    return  {
      login: formValue.loginInput.login,
      password: formValue.passwordInput.password
    }
  }
}
