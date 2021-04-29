import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-space-hanger',
  templateUrl: './space-hanger.component.html',
  styleUrls: ['./space-hanger.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpaceHangerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
