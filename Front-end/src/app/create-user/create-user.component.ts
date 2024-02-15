import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHelperService } from '../services/api-helper.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit{

  dataSource = [];
  firstnameControl = new FormControl('',[Validators.required]);
  lastnameControl = new FormControl('',[Validators.required]);
  ageControl = new FormControl('',[Validators.required]);
  passwordControl = new FormControl('',[Validators.required]);


  constructor(
    private http: HttpClient,
    private api: ApiHelperService,
    private router: Router,

    ) {}

    
  ngOnInit(): void {
    const request: Observable<any> = this.http.get('http://localhost:3000/users/create', { observe: 'response' });
    request.subscribe({ next : (response) => {this.dataSource = response.body
    }});
  }

  create(): void {
    const firstname = this.firstnameControl.value;
    const lastname = this.lastnameControl.value;
    const age = this.ageControl.value;
    const password = this.passwordControl.value;
  
    const newUser = {
      firstname: firstname,
      lastname: lastname,
      age: age,
      password: password
    };
  
    this.http.post('http://localhost:3000/users', newUser)
      .subscribe({
        next: (response) => {
          // Handle the success response here
          console.log('User created successfully', response);
          this.router.navigateByUrl('/users');
        },
        error: (error) => {
          // Handle the error response here
          console.error('Error creating user', error);
        }
      });
  }
  
}
