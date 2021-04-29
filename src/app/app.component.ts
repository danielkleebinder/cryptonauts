import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {routeAnimation} from './app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.isActivated && outlet.activatedRoute;
  }
}
