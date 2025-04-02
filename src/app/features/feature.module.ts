import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FeatureRoutingModule } from './features.routing.module';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule
    , HomeModule
  ]
})
export class FeatureModule { }
