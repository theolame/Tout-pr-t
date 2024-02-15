import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const service = inject(TokenStorageService)
  
  if(service.isLogged()) {
    console.log("AuthGard : true");
    return true;
  }
    
  console.log("AuthGard : false");
  router.navigateByUrl('/login');
  return false;
  };
