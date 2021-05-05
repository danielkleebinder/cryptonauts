import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokensComponent {
  @Input() tokens = 0;
}
