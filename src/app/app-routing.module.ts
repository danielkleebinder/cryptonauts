import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'planets',
    loadChildren: () => import('./planets/planets.module').then(m => m.PlanetsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'me',
    loadChildren: () => import('./astronaut/astronaut.module').then(m => m.AstronautModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
