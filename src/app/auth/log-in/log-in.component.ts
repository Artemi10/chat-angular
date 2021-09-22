import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  public logInForm: FormGroup = new FormGroup({});
  public errorMessage: string = '';
  public isPreloaderOpened: boolean = false;

  constructor(private auth: AuthService, private tokenService: TokenService,
              private router: Router) {
    this.logInForm.addControl('login', new FormControl('', Validators.required));
    this.logInForm.addControl('password', new FormControl('', Validators.required));
  }

  public checkInput(inputName: string): boolean{
    return this.logInForm.controls[inputName].invalid
      && this.logInForm.controls[inputName].touched;
  }

  public logIn(): void{
    this.isPreloaderOpened = true;
    this.errorMessage = '';
    this.auth.logIn(this.logInForm.value)
      .subscribe(token => {
        this.tokenService.setToken(token);
        this.router.navigate(['/verify'])
          .then(() => this.isPreloaderOpened = false);
      }, error => {
        if (error.status === 401 || error.status === 403 || error.status === 404){
          this.errorMessage = error.error;
          this.isPreloaderOpened = false;
        }
      });
  }

}
