import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent, canActivate: [authGuard] },
  { path: 'user/:id', component: UserDetailsComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'users/create', component: CreateUserComponent },
  { path: '', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
