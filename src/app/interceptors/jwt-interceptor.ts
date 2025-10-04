import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwtToken');

  console.log('%c[JWT-INTERCEPTOR] Outgoing request:', 'color: green; font-weight: bold;');
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  console.log('Headers BEFORE:', req.headers);

  if (token) {
    console.log("inside if:: " +token);
    const cloned = req.clone({
      
      setHeaders: {
        Authorization: `Bearer ${token}`
      
      
      }
      
    });
    console.log("clone "+cloned);
    return next(cloned);
  }
  console.log("request "+req);
  return next(req);
};
