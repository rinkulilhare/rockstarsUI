import { CanActivateFn } from '@angular/router';

export const franchiseGuard: CanActivateFn = (route, state) => {
  return true;
};
