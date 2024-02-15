import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  isLogged: boolean = this.tokenStorageService.isLogged();

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,

  ) {}


  logout(): void {
    this.tokenStorageService.clear();
    this.router.navigateByUrl("/login");
  }

  user(): void {
    this.router.navigateByUrl("/users");
  }

  addUser(): void {
    this.router.navigateByUrl("/users/create");
  }

  // addAssociation(): void {
  //   this.router.navigateByUrl("/associations/create");
  // }
}
