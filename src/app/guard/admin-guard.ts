import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login-service';
import { map, catchError, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  const router = inject(Router);
  console.log("inside admin guard");

  return login.getCurrentUser().pipe(
    map((user: any) => {
      
      // Example response: { profileType: 'ADMIN', link: '/TheRockstars/admin/profile' }
      console.log(user[0]);
      console.log(user[0].profileType);
      user.forEach((element: any) => {
        console.log(element);
     });
      // Check if the user has the 'ADMIN' role
      if (user[0].profileType === 'ADMIN') {
        console.log(user.profileType);
        return true;
      } else {
        console.log(user.profileType);
        router.navigate(['/login']);
        return false;
      }
       
    }),
    catchError(() => {
      console.log("error caught in guard");
      router.navigate(['/login']);
      return of(false);
    })
  );
};
