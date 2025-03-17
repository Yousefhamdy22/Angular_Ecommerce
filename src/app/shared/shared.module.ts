import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from "primeng/dropdown"
import { BadgeModule } from "primeng/badge"
import { OverlayPanelModule } from "primeng/overlaypanel"
import { MenuItemContent, MenuModule } from "primeng/menu"
import type { MenuItem } from "primeng/api"
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
HeaderComponent,
FooterComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    BadgeModule,
    OverlayPanelModule,
    MenuModule,
    OverlayPanelModule,
    MenuItemContent,
    DropdownModule,
    RouterOutlet
  


  
  ],
  exports: [
  
 HeaderComponent,
 FooterComponent
  ]
})
export class SharedModule { }