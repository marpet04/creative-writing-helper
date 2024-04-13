import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  registrationForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    birthDate: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl('')
  });

  constructor() {}

  ngOnInit(): void {
  }

  registrate() {
    console.log("Sikeres regisztráció!");
    /*if (this.registrationForm.value.password === this.registrationForm.value.repassword) {
      this.authservice.registrate(this.registrationForm.value.email, this.registrationForm.value.password)
      .then(cred => {
        console.log(cred);
        if (!this.isSlideChecked) {
          const user: User = {
            id: cred.user?.uid as string,
            name: this.registrationForm.value.name,
            email: this.registrationForm.value.email,
            birthDate: this.registrationForm.value.birthDate
          }
          this.userservice.create(user)
          .then(user => {
            console.log(user);
          }).catch(err => {
            alert(err.message)
          });
        } else if (this.isSlideChecked && this.registrationForm.value.doctor_id && this.registrationForm.value.phonenumber) {
          const doctor: Doctor = {
            id: cred.user?.uid as string,
            name: this.registrationForm.value.name,
            email: this.registrationForm.value.email,
            birthDate: this.registrationForm.value.birthDate,
            doctor_id: this.registrationForm.value.doctor_id,
            phonenumber: this.registrationForm.value.phonenumber
          }
          this.doctorservice.create(doctor)
          .then(doctor => {
            console.log(doctor);
          }).catch(err => {
            alert(err.message)
          });
        } else {
          alert("Nem töltötted ki a doktorsághoz kötelező mezőket!")
        } 
        this.router.navigateByUrl('/login');
      }).catch(err => {
        alert(err.message);
      })
    } else {
      alert("A jelszó nem egyezik meg a megerősítéssel!")
    }*/
    
  }

}
