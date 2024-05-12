import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  constructor(private authService: AuthService, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.patchValues();
  }

  profileForm = new FormGroup ({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('', Validators.required())
  });

  patchValues() {
    this.authService.getUser(localStorage.getItem('email')!).subscribe((user: any) => {
      this.profileForm.patchValue({
        name: user.username,
        email: user.email
      });
    })
  }

  updateProfile() {
    this.authService.reAuthenticate(this.profileForm.value.password!);
    this.authService.getUser(this.profileForm.value.email!).subscribe((user: any) => {
      this.authService.updateUser({
        id: user.id,
        username: this.profileForm.value.name!,
        email: user.email
      }).subscribe((updatedUser: any) => {
        localStorage.setItem('username', this.profileForm.value.name!)
        console.log(updatedUser);
        this.showSuccess('Profil frissítve!');
      })
    });

  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Autentikáció');
  }

}
