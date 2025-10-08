import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { LoginService } from '../services/login-service';
import { map, catchError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const expectedRoles = route.data?.['roles'] as string[];
  const platformId = inject(PLATFORM_ID);
  
   const token = localStorage.getItem('jwtToken');

  
 

  if(!token){
    router.navigate(['/login']);
    return false;
  }


  const userRole = JSON.parse(localStorage.getItem('user') || '[]');
  console.log("userRole:: " +userRole);

  const userRoles = userRole.map((u: any) => u.profileType);
  console.log("userRoles:: " +userRoles);

  //check matching role

   const hasRole = expectedRoles?.some(r => userRoles.includes(r));
   console.log("hasRole:: " +hasRole);


  if (!hasRole) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};