import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-described-text',
  templateUrl: './described-text.component.html',
  styleUrls: ['./described-text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescribedTextComponent {
  @Input() description: string;
}
