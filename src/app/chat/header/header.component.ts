import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() openSearchFormEvent = new EventEmitter();

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  public clickSearchButtonListener(): void{
    this.openSearchFormEvent.emit();
  }

  public logOut(): void{
    this.tokenService.removeToken();
    this.router.navigate(['/logIn']);
  }

}
