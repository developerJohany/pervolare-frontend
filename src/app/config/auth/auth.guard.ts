import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { Observable } from 'rxjs'
import { AuthService } from 'src/app/layout/service/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
      console.log('aquiii')
      this.router.navigate(['/auth/login'])
      return false
    }
    return true
  }
}
