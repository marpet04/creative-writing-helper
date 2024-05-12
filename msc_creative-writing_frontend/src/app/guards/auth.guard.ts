import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard {
    constructor(private router: Router, private toastr: ToastrService) {
  
    }
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const user = localStorage.getItem('custom_token');
        if (user) {
         return true;
        }
        this.showFailure('Ehhez a művelethez be kell jelentkezned!');
        this.router.navigateByUrl('/login');
        return false;
      
    }

    canActivateChild(
      childRoute: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
    }

    showFailure(message: string) {
        this.toastr.error(message, 'Útvonal', {
          closeButton: true
        });
      }
    
  }
  