import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Flight } from '../../core/models/flight.model';
import { FlightService } from '../../core/services/flight.service';
import { FlightCardComponent } from '../../shared/flight-card/flight-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FlightCardComponent,
    AsyncPipe
  ],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss'
})
export class FlightSearchComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly flightService = inject(FlightService);
  private readonly router = inject(Router);

  readonly searchForm = this.formBuilder.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    departureDate: ['', Validators.required],
    returnDate: ['', Validators.required],
    passengers: [
      1,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(9)
      ]
    ]
  });

  private readonly flightsSubject = new BehaviorSubject<Flight[]>([]);
  private readonly maxPriceSubject = new BehaviorSubject<number | null>(null);
  private readonly stopsSubject = new BehaviorSubject<number | null>(null);

  readonly flights$ = this.flightsSubject.asObservable();

  readonly maxPrice$ = this.maxPriceSubject.asObservable();

  readonly selectedStops$ = this.stopsSubject.asObservable();

  readonly filteredFlights$ = combineLatest([
    this.flights$,
    this.maxPrice$,
    this.selectedStops$
  ]).pipe(
    map(([flights, maxPrice, selectedStops]) =>
      flights.filter((flight) => {
        const matchesPrice =
          maxPrice === null || flight.price <= maxPrice;

        const matchesStops =
          selectedStops === null ||
          flight.stops === selectedStops;

        return matchesPrice && matchesStops;
      })
    )
  );

  isLoading = false;

  errorMessage = '';

  onSearch(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.flightService.getFlights().subscribe({
      next: (flights) => {
        this.flightsSubject.next(flights);
        this.isLoading = false;
      },

      error: () => {
        this.errorMessage =
          'Unable to load flights. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onPriceChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.maxPriceSubject.next(
      value ? Number(value) : null
    );
  }

  onStopsChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.stopsSubject.next(
      value ? Number(value) : null
    );
  }

  onFlightSelected(flight: Flight): void {
  this.router.navigate(['/flights', flight.id]);
  }
}