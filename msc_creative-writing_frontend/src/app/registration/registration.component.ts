import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  registrationForm = new FormGroup({
    name: new FormControl('', Validators.required()),
    email: new FormControl('', Validators.required()),
    password: new FormControl('', Validators.required()),
    repassword: new FormControl('', Validators.required())
  });

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  registrate() {
    if (this.registrationForm.value.password === this.registrationForm.value.repassword) {
      this.authService.registration(this.registrationForm.value.email!, this.registrationForm.value.password!, this.registrationForm.value.name!);
      this.showSuccess('Sikeres regisztráció!');
    } else {
      this.showFailure('A két jelszó nem egyezik meg!');
    }
    
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Regisztráció');
  }

  showFailure(message: string) {
    this.toastr.error(message, 'Regisztráció', {
      closeButton: true
    });
  }

}
