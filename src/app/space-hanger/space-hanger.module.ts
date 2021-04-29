import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SpaceHangerComponent} from './space-hanger.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


const routes: Routes = [
  {path: '', component: SpaceHangerComponent}
];


@NgModule({
  declarations: [SpaceHangerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatSidenavModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SpaceHangerModule {
}
