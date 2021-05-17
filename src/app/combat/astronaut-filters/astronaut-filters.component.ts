import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AstronautFilters} from './astronaut-filters';

@Component({
  selector: 'app-astronaut-filters',
  templateUrl: './astronaut-filters.component.html',
  styleUrls: ['./astronaut-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstronautFiltersComponent implements OnInit {

  @Output() filter = new EventEmitter<AstronautFilters>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      minLevel: [null, Validators.min(0)],
      maxLevel: [null, Validators.min(0)]
    });
    this.formGroup.valueChanges.subscribe(val => this.filter.emit(val));
  }
}
