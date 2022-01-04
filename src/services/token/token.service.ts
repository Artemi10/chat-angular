import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenHeader: string

  constructor() {
    this.tokenHeader = 'jwt'
  }

  public getTokenHeader(): string{
    const token = this.getToken();
    const login = this.getUserLogin();
    return '<wsse:Security xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">\n' +
      '<wsse:UsernameToken>' +
      `   <wsse:Username>${login}</wsse:Username>` +
      `   <wsse:Password>${token}</wsse:Password>` +
      '</wsse:UsernameToken></wsse:Security>';
  }

  public getToken(): string{
    const jwt = localStorage.getItem(this.tokenHeader)
    if (jwt === null) return ''
    else return jwt
  }

  public setToken(jwt: string){
    localStorage.setItem(this.tokenHeader, jwt)
  }

  public removeToken(){
    localStorage.removeItem(this.tokenHeader)
  }

  public isTokenExists(): boolean {
    return localStorage.getItem(this.tokenHeader) !== null
  }

  public getUserState(): string {
    const jwt = this.getToken()
    const decoded: any = jwt_decode(jwt)
    return decoded.state
  }

  public isExpired(){
    const token = this.getToken()
    try {
      const tokenDate = this.getAccessTokenExpirationDateDate(token);
      return !(tokenDate.valueOf() > new Date().valueOf());
    }catch (e) {return true; }
  }

  private getAccessTokenExpirationDateDate(token: string): Date{
    const decodedToken = jwt_decode(token);
    // @ts-ignore
    if (decodedToken.exp === undefined) {
      throw new Error ('No expiration date in JWT');
    }
    const date = new Date(0);
    // @ts-ignore
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }

  public getUserLogin(): string{
    const decodedToken = jwt_decode(this.getToken());
    // @ts-ignore
    return decodedToken.sub;
  }

}
