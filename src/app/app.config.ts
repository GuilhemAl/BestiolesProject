import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PersonneListComponent } from './personne-list/personne-list.component';
import { PersonneDetailComponent } from './personne-detail/personne-detail.component';
import { PersonneEditComponent } from './personne-edit/personne-edit.component';
import { SpeciesListComponent } from './species-list/species-list.component';
import { SpeciesDetailComponent } from './species-detail/species-detail.component';
import { SpeciesEditComponent } from './species-edit/species-edit.component';
import { SpeciesCreateComponent } from './species-create/species-create.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { AnimalEditComponent } from './animal-edit/animal-edit.component';
import { AnimalCreateComponent } from './animal-create/animal-create.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { CurrentUserService } from './services/current-user.service';
import { PersonneCreateComponent } from './personne-create/personne-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PersonneListComponent,
    PersonneDetailComponent,
    HeaderComponent,
    PersonneEditComponent,
    SpeciesListComponent,
    SpeciesDetailComponent,
    SpeciesEditComponent,
    SpeciesCreateComponent,
    AnimalListComponent,
    AnimalDetailComponent,
    AnimalEditComponent,
    AnimalCreateComponent,
    PersonneCreateComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
