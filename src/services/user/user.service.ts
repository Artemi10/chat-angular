import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import { TokenService } from '../token/token.service';
import {environment} from "../../environments/environment";
import { XmlUserConverter } from '../converter/user/xml-user-converter.service';
import {map} from "rxjs/operators";
import {dateParser} from "../utils/date-utils.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenService: TokenService,
              private userConverterService: XmlUserConverter) {}

  public getUserFriends(): Observable<User[]>{
    const header = this.tokenService.getTokenHeader();
    const body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
                        'xmlns:gs="http://spring.io/guides/gs-producing-web-service">' +
      `   <soapenv:Header>${header}</soapenv:Header>` +
      '   <soapenv:Body>' +
      '     <gs:getUserFriendsRequest/>' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
    return this.http.post(`${environment.api}/account`, body,
      {headers: {'Content-Type': 'text/xml'}, responseType : 'text' })
      .pipe(map(resp => this.userConverterService.convertList(resp, 'ns2:friends')))
  }

  public updateUser(userToUpdate: User): Observable<string> {
    const header = this.tokenService.getTokenHeader();
    const body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:gs="http://spring.io/guides/gs-producing-web-service">' +
      `   <soapenv:Header>${header}</soapenv:Header>` +
      '   <soapenv:Body>' +
      '      <gs:updateUserRequest>' +
      '         <gs:userToUpdate>' +
      `            <gs:id>${userToUpdate.id}</gs:id>` +
      `            <gs:login>${userToUpdate.login}</gs:login>` +
      `            <gs:birthDate>${dateParser(userToUpdate.birthDate)}</gs:birthDate>` +
      '         </gs:userToUpdate>' +
      '      </gs:updateUserRequest>' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
    return this.http.post(`${environment.api}/account`, body,
      {headers: {'Content-Type': 'text/xml'}, responseType : 'text' });
  }

  public getUser(): Observable<User>{
    const header = this.tokenService.getTokenHeader();
    const body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:gs="http://spring.io/guides/gs-producing-web-service">' +
      `   <soapenv:Header>${header}</soapenv:Header>` +
      '   <soapenv:Body>' +
      '    <gs:getUserByLoginRequest/>' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
    return this.http.post(`${environment.api}/account`, body,
      {headers: {'Content-Type': 'text/xml'}, responseType : 'text' })
      .pipe(map(resp => this.userConverterService.convert(resp, 'ns2:user')));
  }

  public getUserByPattern(searchName: string, page: number, size: number): Observable<User[]>{
    const header = this.tokenService.getTokenHeader();
    const body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:gs="http://spring.io/guides/gs-producing-web-service">' +
      `   <soapenv:Header>${header}</soapenv:Header>` +
      '   <soapenv:Body>' +
      '      <gs:getUserLoginsByPatternRequest>' +
      `         <gs:searchName>${searchName}</gs:searchName>` +
      `         <gs:page>${page}</gs:page>` +
      `         <gs:size>${size}</gs:size>` +
      '      </gs:getUserLoginsByPatternRequest>' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
    return this.http.post(`${environment.api}/account`, body,
      {headers: {'Content-Type': 'text/xml'}, responseType : 'text' })
      .pipe(map(resp => this.userConverterService.convertList(resp, 'ns2:users')))
  }
}
