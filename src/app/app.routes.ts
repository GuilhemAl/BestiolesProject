import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PersonneListComponent } from './personne-list/personne-list.component';
import { PersonneDetailComponent } from './personne-detail/personne-detail.component';
import { BestioleListComponent } from './bestiole-list/bestiole-list.component';
import { BestioleDetailComponent } from './bestiole-detail/bestiole-detail.component';
import { EspeceListComponent } from './espece-list/espece-list.component';
import { EspeceDetailComponent } from './espece-detail/espece-detail.component';
import { AuthGuard } from './services/auth.guard';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'personnes',
    component: PersonneListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'personne/:id',
    component: PersonneDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bestioles',
    component: BestioleListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bestiole/:id',
    component: BestioleDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'especes', component: EspeceListComponent, canActivate: [AuthGuard] },
  {
    path: 'espece/:id',
    component: EspeceDetailComponent,
    canActivate: [AuthGuard],
  },
  // Ajoutez d'autres routes si nécessaire
];
