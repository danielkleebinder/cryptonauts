import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-astronaut',
  templateUrl: './new-astronaut.component.html',
  styleUrls: ['./new-astronaut.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewAstronautComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
