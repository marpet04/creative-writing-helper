import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, EmailAuthProvider, createUserWithEmailAndPassword, reauthenticateWithCredential, signInWithEmailAndPassword, updatePassword } from '@angular/fire/auth';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedDataService } from './shared-data.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private auth: Auth, private router: Router, private http: HttpClient, private sharedData: SharedDataService, private toastr: ToastrService) { }

  user: any;

  isUserLoggedIn() {
    return this.auth.currentUser;
  }

  registration(email: string, password: string, username: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
    .then((cred) => {
      this.saveUser({
        username: username,
        email: email
      }).subscribe((message: any) => {
        console.log(message);
      })
        this.router.navigateByUrl('/login');
    })
    .catch((err) => {
      this.showFailure(err.message);
    });
  }

  newPassword(oldPassword: string, newPassword: string) {
    const user = this.isUserLoggedIn();
    this.reAuthenticate(oldPassword);
    if (user) {
      updatePassword(user, newPassword).then(() => {
        this.showSuccess("Sikeres jelszóváltoztatás. Kérem, jelentkezzen be újból!");
        this.logout();
        this.router.navigateByUrl('/login');
      }).catch((error) => {
        this.showFailure(error);
      });
    } else {
      this.showSuccess("Kérem, jelentkezzen be újból!");
      this.router.navigateByUrl('/login');
    }

  }

  reAuthenticate(password: string) {
    const user = this.isUserLoggedIn();
    if (user && user.email) {
      reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, password)
      ).catch((err: { message: any; }) => {
        this.showFailure(err.message);
      });
    } else {
      this.showFailure("Nem tudom, ki vagy!");
      this.router.navigateByUrl('/login');
    }

  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((cred) => {
        cred.user.getIdToken().then(a => {
          console.log(a);
          localStorage.setItem("custom_token", a);
          localStorage.setItem("email", email);
        }).then(() => {
          this.getUser(email).subscribe((user: any) => {
            this.sharedData.setUser({
              username: user.username,
              email: user.email,
              id: user.id
            });
              this.router.navigate(['/nav/dashboard']);
          });
        });
      })
      .catch((error) => {
        this.showFailure(error);
      });
  }

  logout() {
    console.log(this.auth.currentUser)
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem("custom_token");
        localStorage.removeItem("email");
        this.sharedData.removeSharedData();
        this.showSuccess('Sikeres kijelentkezés!');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.showFailure(error);
      });
  }

  saveUser(user: User) : any {
    return this.http.post('http://localhost:8080/api/user/public/saveUser', user);
  }

  getUser(email: string) : any  {
    let headers = new HttpHeaders({
      'email': email
    });
    let options = { headers: headers };
    return this.http.get('http://localhost:8080/api/user/public/getUser', options);
  }

  updateUser (user: User) : any {
    return this.http.post('http://localhost:8080/api/user/updateUser', user);
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Autentikáció');
  }

  showFailure(message: string) {
    this.toastr.error(message, 'Autentikáció', {
      closeButton: true
    });
  }

}
