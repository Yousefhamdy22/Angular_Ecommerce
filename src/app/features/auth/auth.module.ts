import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';

// Components



@NgModule({
  declarations: [
      
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    MessagesModule
  ],
  providers:[
    AuthService
  ],
  exports:[
  
  ]
})
export class AuthModule { }
