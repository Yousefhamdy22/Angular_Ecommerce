import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
      // withHashLocation(),
      // withDisabledInitialNavigation()
    )
    //provideRouter(routes)
    , provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })
  ]
};


// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { providePrimeNG } from 'primeng/config';
// import Aura from '@primeng/themes/aura';
// import { AppRoutingModule } from './app/app-routing.module';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(
//       AppRoutingModule, // Reference the routing module directly
//       withComponentInputBinding(),
//       withRouterConfig({ paramsInheritanceStrategy: 'always' })
//     ),
//     provideAnimationsAsync(),
//     providePrimeNG({
//       theme: {
//         preset: Aura
//       }
//     })
//   ]
// };