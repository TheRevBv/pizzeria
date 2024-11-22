
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';  

platformBrowserDynamic().bootstrapModule(AppModule)  // Arranca el módulo principal
  .catch(err => console.error(err));