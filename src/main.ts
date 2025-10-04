import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './app/interceptors/jwt-interceptor'; // <-- function interceptor
import { appConfig } from './app/app.config';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(
      withInterceptors([jwtInterceptor])  // ✅ register interceptor here
    )
  ]
}).catch((err) => console.error(err));
