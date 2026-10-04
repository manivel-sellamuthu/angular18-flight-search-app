import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/flight-search/flight-search.component')
        .then((m) => m.FlightSearchComponent)
  },
  {
    path: 'flights/:id',
    loadComponent: () =>
      import('./features/flight-details/flight-details.component')
        .then((m) => m.FlightDetailsComponent)
  },
  {
    path: '**',
    redirectTo: 'search'
  }
];