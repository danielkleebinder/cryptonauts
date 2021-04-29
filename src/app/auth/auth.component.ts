import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  letsGo(): void {
    this.router.navigate(['/planets']);
  }

}
