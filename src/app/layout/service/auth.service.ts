import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom, Observable } from 'rxjs'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'

@Injectable()
export class AuthService {
  public jwtHelper: JwtHelperService = new JwtHelperService()
  public API_URL = environment.endpoint

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateCredentials(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/login`, credentials)
  }

  public isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem('token')
      return !this.jwtHelper.isTokenExpired(token ? token : '')
    } catch (error) {
      alert(
        'Detectamos un fallo en la autentificación'
      )
      this.logout()
      return false
    }
  }

  async logout(removeTokenBackend = true): Promise<void> {
    if (removeTokenBackend)
      await lastValueFrom(this.http.get(`${this.API_URL}/auth/logout`))
    localStorage.removeItem('token')
    this.router.navigateByUrl('/auth/login')
  }
}
