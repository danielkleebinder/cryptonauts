import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoCardComponent {

  @Input() iconUrl: string;
  @Input() header: string;
  @Input() description: string;

}
