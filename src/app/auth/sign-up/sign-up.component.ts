import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { TokenService } from '../../../services/token/token.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public signUpForm: FormGroup = new FormGroup({});
  public errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router,
              private tokenService: TokenService) {
    this.signUpForm.addControl('login', new FormControl('', Validators.required));
    this.signUpForm.addControl('email', new FormControl('', [Validators.required, Validators.email]));
    this.signUpForm.addControl('password', new FormControl('', [Validators.required]));
    this.signUpForm.addControl('rePassword', new FormControl('', [Validators.required, this.rePasswordValidator.bind(this)]));
  }

  public signUp(): void{
    this.auth.signUp(this.signUpForm.value)
      .subscribe(token => {
        this.tokenService.setToken(token);
        this.router.navigate(['/']);
      }, error => {
        if (error.status === 401 || error.status === 403 || error.status === 404){
          this.errorMessage = error.error;
        }
      });
  }

  public checkInput(inputName: string): boolean{
    return this.signUpForm.controls[inputName].invalid
      && this.signUpForm.controls[inputName].touched;
  }

  private rePasswordValidator(control: FormControl): null | { NotEqual: boolean }{
    return control.value === this.signUpForm.value.password ? null : {
      NotEqual: true
    };
  }

}
