import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CombatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
