import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class MenuGuard {
    constructor(private router: Router, private toastr: ToastrService) {
  
    }
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const story = localStorage.getItem('selectedStoryDocID');
        if (story != null) {
            return true;
        }
        this.showFailure('Válassz vagy készíts egy Történetet a továbblépéshez!');
        this.router.navigateByUrl('/nav/dashboard');
        return false;
      
    }
  
    showFailure(message: string) {
      this.toastr.error(message, 'Útvonal', {
        closeButton: true
      });
    }
    
  }
  