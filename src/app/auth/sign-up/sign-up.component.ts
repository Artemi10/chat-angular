import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { TokenService } from '../../../services/token/token.service';
import {Router} from "@angular/router";
import {handleError} from "../utils/utils";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  private password: string;
  public signUpForm: FormGroup;
  public errorMessage: string;
  public isPreloaderOpened: boolean;
  @ViewChild('datepicker') private datepicker: ElementRef | undefined;

  constructor(private auth: AuthService, private router: Router,
              private tokenService: TokenService, private formBuilder: FormBuilder) {
    this.password = '';
    this.errorMessage = '';
    this.isPreloaderOpened = false;
    this.signUpForm = formBuilder.group({
      loginInput: formBuilder.group({
        login: new FormControl('', Validators.required)
      }),
      emailInput: formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email])
      }),
      birthDateInput: formBuilder.group({
        birthDate: new FormControl('', Validators.required)
      }),
      passwordInput: formBuilder.group({
        password: new FormControl('', new FormControl('', Validators.required))
      })
    });
    this.signUpForm.addControl('repasswordInput', formBuilder.group({
      repassword: new FormControl('', new FormControl('', [Validators.required, this.rePasswordValidator.bind(this)]))
    }))
  }

  public signUp(): void{
    this.isPreloaderOpened = true;
    this.auth.signUp(this.requestBody)
      .subscribe(token => {
        this.tokenService.setToken(token);
        this.router.navigate(['/'])
          .then(() => this.isPreloaderOpened = false);
      }, error => {
        this.errorMessage = handleError(error);
        this.isPreloaderOpened = false;
      });
  }

  private get requestBody(): object{
    const formValue = this.signUpForm.value;
    return  {
      login: formValue.loginInput.login,
      password: formValue.passwordInput.password,
      birthDate: formValue.birthDateInput.birthDate,
      email: formValue.emailInput.email
    }
  }

  // TODO
  private rePasswordValidator(control: FormControl): null | { NotEqual: boolean }{
    console.log(this.signUpForm.value.passwordInput.password)
    return control.value === this.signUpForm.value.passwordInput.password ? null : {
      NotEqual: true
    };
  }
}
