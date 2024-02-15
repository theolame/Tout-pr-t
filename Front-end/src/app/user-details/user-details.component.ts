import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  userId: string;
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource : any[] = [];

  constructor(private route: ActivatedRoute,private http: HttpClient) {
    this.userId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    const request1: Observable<any> = this.http.get('http://localhost:3000/users/' + this.userId, { observe: 'response' });
    request1.subscribe({ next : (response) =>{
      this.dataSource = [response.body];
    } });
  }

}