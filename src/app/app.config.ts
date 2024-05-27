import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PersonneListComponent } from './personne-list/personne-list.component';
import { PersonneDetailComponent } from './personne-detail/personne-detail.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { CurrentUserService } from './services/current-user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PersonneListComponent,
    PersonneDetailComponent,
    HeaderComponent,
    // autres composants
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    AuthService,
    CurrentUserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppConfig { }
