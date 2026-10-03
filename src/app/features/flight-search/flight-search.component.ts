import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss'
})
export class FlightSearchComponent {
  private readonly formBuilder = inject(FormBuilder);

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

  onSearch(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    console.log('Flight search:', this.searchForm.getRawValue());
  }
}