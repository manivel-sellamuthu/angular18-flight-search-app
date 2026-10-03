import { Component } from '@angular/core';
import { FlightSearchComponent } from './features/flight-search/flight-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FlightSearchComponent],
  template: '<app-flight-search />'
})
export class AppComponent {}