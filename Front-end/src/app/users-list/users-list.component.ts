import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  idUserToken: boolean = true;
  idUserControl = new FormControl('',[Validators.required]);
  

  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {}

  ngOnInit(): void {
    const request: Observable<any> = this.http.get('http://localhost:3000/users', { observe: 'response' });
    request.subscribe({ next : (response) => this.dataSource = response.body });
  }

  // Rechecher(): void{
  //   const request: Observable<any> = this.http.get('http://localhost:3000/users/' + this.idUserControl.value, { observe: 'response' });
  //   request.subscribe({ next : (response) => this.dataSource = response.body });
  //   console.log(request);
  //   this.router.navigateByUrl('/user/' + this.idUserControl.value);
  // }

  Rechecher(): void {
    const request: Observable<any> = this.http.get('http://localhost:3000/users/' + this.idUserControl.value, { observe: 'response' });
  
    request.subscribe({
      next: (response) => {
        if (response.body) {
          // Si la réponse contient des données (utilisateur trouvé)
          this.dataSource = response.body;
          console.log(response);
          this.idUserToken = true;
          this.router.navigateByUrl('/user/' + this.idUserControl.value);
        } else {
          // Aucun utilisateur trouvé, gérer en conséquence (peut-être afficher un message d'erreur)
          this.idUserToken = false;
          console.log('Aucun utilisateur trouvé');
        }
      },
      error: (error) => {
        // Gérer les erreurs de requête ici
        this.idUserToken = false;
        console.error('Erreur de recherche d\'utilisateur:', error);
      }
    });
  }
  

}



  // delete(): void {
  //   this.http.delete('http://localhost:3000/users/{id}')
  // }



