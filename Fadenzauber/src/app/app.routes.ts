
import { Routes } from '@angular/router';
import { StartseiteComponent } from './pages/startseite/startseite.component';
import { AnleitungenComponent } from './pages/anleitungen/anleitungen.component';
import { GalerieComponent } from './pages/galerie/galerie.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';

export const routes: Routes = [
  { path: '', redirectTo: 'startseite', pathMatch: 'full' },
  { path: 'startseite', component: StartseiteComponent },
  { path: 'anleitungen', component: AnleitungenComponent },
  { path: 'galerie', component: GalerieComponent },
  { path: 'tutorial', component: TutorialComponent },
];
