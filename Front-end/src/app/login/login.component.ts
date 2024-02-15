import { Component } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginToken: boolean = true;
  usernameControl = new FormControl('',[Validators.required]);
  passwordControl = new FormControl('',[Validators.required]);
  
  constructor(
       private api: ApiHelperService,
       private tokenStorageService: TokenStorageService,
       private router: Router,
  ) {}

  ngOnInit(): void {
    this.usernameControl.valueChanges.subscribe(res=>console.log(res))
  }
    


  login(): void {
    const username = this.usernameControl.value;
    const password = this.passwordControl.value;
    this.loginToken=false;
    this.api.post({endpoint: '/auth/login', data: { username, password }})
    .then(response => {
      this.tokenStorageService.save(response.access_token);
      if (this.tokenStorageService.isLogged()){
        this.router.navigateByUrl('/users');
        this.loginToken=true;
      }
    })
  }

}
