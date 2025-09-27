import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, inject,importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER,NgxUiLoaderService  } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: SPINNER.threeStrings,
  fgsSize: 60,
  fgsColor: "red",
  overlayColor: 'rgba(40,40,40,0.3)',
  bgsType: SPINNER.ballSpinClockwise,
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 50,
  hasProgressBar: true
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
     
    provideHttpClient(
      withFetch(),
      withInterceptors([
        (req, next) => {
          const loader = inject(NgxUiLoaderService);
          loader.start(); // show loader when request starts
          return next(req).pipe(
            finalize(() => loader.stop()) // hide loader when request finishes
          );
        }
      ])
    ),    
     // 👇 Register NgxUiLoaderModule with config
    importProvidersFrom(NgxUiLoaderModule.forRoot(ngxUiLoaderConfig))
  ]
};
