import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Validators } from 'ngx-editor';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required()),
    password: new FormControl('', Validators.required())
  });

  constructor(private authService: AuthService, private sharedData: SharedDataService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!);
  }
}
