import { Component, input, output } from '@angular/core';
import { Flight } from '../../core/models/flight.model';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {
  readonly flight = input.required<Flight>();

  readonly flightSelected = output<Flight>();

  onSelect(): void {
    this.flightSelected.emit(this.flight());
  }
}