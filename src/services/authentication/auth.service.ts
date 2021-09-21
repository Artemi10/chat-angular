import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public logIn(logInDTO: any): Observable<string> {
    return this.http.post<string>(`${environment.api}/auth/logIn`, logInDTO, {responseType : 'text' as 'json'})
  }

  public signUp(signUpDTO: any): Observable<string> {
    return this.http.post<string>(`${environment.api}/auth/signUp`, signUpDTO, {responseType : 'text' as 'json'})
  }

  public verifyCode(codeDTO: any): Observable<string> {
    return this.http.post<string>(`${environment.api}/auth/verify`, codeDTO, {responseType : 'text' as 'json'})
  }

  public repeatCode(): Observable<string> {
    return this.http.get<string>(`${environment.api}/auth/code`, {responseType : 'text' as 'json'})
  }
}
