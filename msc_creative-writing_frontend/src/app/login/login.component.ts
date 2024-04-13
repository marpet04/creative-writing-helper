import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    /*this.authservice.login(this.loginForm.value.email, this.loginForm.value.password)
    .then(cred => {
      console.log(cred);
      if (!this.isSlideChecked) {
        localStorage.setItem('role', 'patient');
      } else if (this.isSlideChecked && this.loginForm.value.doctor_id) {
        localStorage.setItem('role', 'doctor');
      } else {
        alert("Nem töltötted ki az orvosnak kötelező mezőket!");
      }
      this.router.navigateByUrl('/home');
    }).catch(err => {
      alert(err.message);
    })*/
    console.log("Sikeres bejelentkezés!");
  }

  
  /*toggleChanges($event: MatSlideToggleChange) {
    this.isSlideChecked = $event.checked;
    console.log(this.isSlideChecked);
}*/
}
