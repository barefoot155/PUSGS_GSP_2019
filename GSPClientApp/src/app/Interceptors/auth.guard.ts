import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })

export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    
      if (localStorage.role === 'Admin') {
        return true;
      }
      else {
        window.alert("Can't access, not admin");
        this.router.navigate(['/']);
        return false;
      }
    }
  
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
    }
  
  }