import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'planets', loadChildren: () => import('./planets/planets.module').then(m => m.PlanetsModule)},
  {path: 'hanger', loadChildren: () => import('./space-hanger/space-hanger.module').then(m => m.SpaceHangerModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
