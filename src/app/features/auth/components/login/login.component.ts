// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';


// @Component({
//   selector: 'app-login',
//   standalone: false,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   errorMessage: string = '';

//   constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
//         next: (res) => {
//           localStorage.setItem('token', res.token);
//           this.router.navigate(['/dashboard']);
//         },
//         error: (err) => {
//           this.errorMessage = 'Invalid credentials';
//         }
//       });
//     }
//   }
// }
