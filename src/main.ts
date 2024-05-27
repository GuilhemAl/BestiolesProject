import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppConfig } from './app/app.config'; // Corrigez ici pour correspondre à 'AppConfig'
import { AppComponent } from './app/app.component';


platformBrowserDynamic().bootstrapModule(AppConfig)
  .catch(err => console.error(err));
