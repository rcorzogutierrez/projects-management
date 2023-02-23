import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../../services/firebase-error.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginUsuario: FormGroup;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirige al usuario a la página de Dashboard si ya ha iniciado sesión previamente
    this.authService.isLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/dashboard']);
      }
    });

    this.loginUsuario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
  
    this.loading = true;
  
    this.authService.login(email, password)
      .then(success => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.loading = false;
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
      });
  }
}