import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Flight } from '../../core/models/flight.model';
import { FlightService } from '../../core/services/flight.service';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss'
})
export class FlightSearchComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly flightService = inject(FlightService);

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

  flights: Flight[] = [];

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
        this.flights = flights;
        this.isLoading = false;
      },

      error: () => {
        this.errorMessage =
          'Unable to load flights. Please try again.';
        this.isLoading = false;
      }
    });
  }
}