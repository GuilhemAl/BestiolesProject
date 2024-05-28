import { Routes } from '@angular/router';
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
import { AuthGuard } from './services/auth.guard';
import { PersonneCreateComponent } from './personne-create/personne-create.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'personnes',
    component: PersonneListComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'personne/:id/edit',
    component: PersonneEditComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'species',
    component: SpeciesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'personne/create',
    component: PersonneCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'species/create',
    component: SpeciesCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'species/:id/edit',
    component: SpeciesEditComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'animal',
    component: AnimalListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'animal/create',
    component: AnimalCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'animal/:id',
    component: AnimalDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'species/:id',
    component: SpeciesDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'animal/:id/edit',
    component: AnimalEditComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'personne/:id',
    component: PersonneDetailComponent,
    canActivate: [AuthGuard],
  },
];
