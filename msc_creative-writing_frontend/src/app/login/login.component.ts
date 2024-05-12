import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Validators } from 'ngx-editor';
import { SharedDataService } from '../services/shared-data.service';
import { Router } from '@angular/router';

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
      this.authService.getUser(this.loginForm.value.email!).subscribe((user: any) => {
        this.sharedData.setUser({
          username: user.username,
          email: user.email,
          id: user.id
        });
        console.log({
          username: user.username,
          email: user.email,
          id: user.id
        });
        this.router.navigate(['/nav/dashboard']);
    })
  }
}
