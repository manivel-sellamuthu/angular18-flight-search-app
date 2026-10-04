import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FlightService } from '../../core/services/flight.service';
import { Flight } from '../../core/models/flight.model';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.scss'
})
export class FlightDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly flightService = inject(FlightService);

  flight: Flight | undefined;

  isLoading = true;

  errorMessage = '';

  ngOnInit(): void {
    const flightId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!flightId) {
      this.errorMessage = 'Invalid flight selected.';
      this.isLoading = false;
      return;
    }

    this.flightService.getFlightById(flightId).subscribe({
      next: (flight) => {
        this.flight = flight;
        this.isLoading = false;

        if (!flight) {
          this.errorMessage = 'Flight not found.';
        }
      },

      error: () => {
        this.errorMessage =
          'Unable to load flight details.';
        this.isLoading = false;
      }
    });
  }
}