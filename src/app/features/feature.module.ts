import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FeatureRoutingModule } from './features.routing.module';
import { HomeModule } from './home/home.module';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { sitecomponentModule } from './sitecomponents/sitecompnent.module';


@NgModule({
  declarations: [
    
    
  ],
  imports: [

    sitecomponentModule ,


    
      CommonModule,
      HomeModule,
      FeatureRoutingModule
    , RatingModule
    , FormsModule
  ],
  exports: [
    
  ]
})
export class FeatureModule { }
