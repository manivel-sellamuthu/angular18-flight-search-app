import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'mock-flights.json';

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  getFlightById(id: number): Observable<Flight | undefined> {
    return this.getFlights().pipe(
      map((flights: Flight[]) =>
        flights.find((flight: Flight) => flight.id === id)
      )
    );
  }
}