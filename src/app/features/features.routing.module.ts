import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './sitecomponents/shop/shop.component';
import { NewarrivalsComponent } from './sitecomponents/newarrivals/newarrivals.component';
import { CategoryshopComponent } from './sitecomponents/shop/categoryshop/categoryshop.component';
import { AboutComponent } from './sitecomponents/about/about.component';
import { ContactComponent } from './sitecomponents/contact/contact.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },

  {
    path: 'shop' , component: ShopComponent

  },
  { path: 'shop/:category/:id', component: CategoryshopComponent }

  ,{
    path: 'newarrivals' , component: NewarrivalsComponent
  },
  {
    path: 'about' , component: AboutComponent
  },
  {
    path: 'contact' , component: ContactComponent
  }
  ,
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)], // Use forChild for feature modules
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
