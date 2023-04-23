import { Injectable } from '@angular/core'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { AuthService } from '../layout/service/auth.service'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private _authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<string>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token')
    if (token) {
      let header
      header = {
        'X-localization': 'es',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        'Access-Control-Max-Age': '3600',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Range, Content-Disposition, Content-Type, Authorization',
        Authorization: `Bearer ${token}`
      }
      request = request.clone({
        setHeaders: header
      })
    }

    return next.handle(request).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((res: any) => {
        // eslint-disable-next-line no-prototype-builtins
        if (res.hasOwnProperty('body')) {
          if (res.body && res.body.status == 'error') {
            alert(res.body.message)
          }
        }
        return res
      }),
      catchError((error: HttpErrorResponse) => {
        const errorMsg = ''
        // eslint-disable-next-line no-prototype-builtins
        if (error.error.hasOwnProperty('code')) {
          this.errorMessageForCode(error.error.code)
        }
        return throwError(errorMsg)
      })
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async errorMessageForCode(code: any, message = ''): Promise<void | string> {
    switch (code) {
      case 'UNAUTHORIZED':
        await this._authService.logout(false)
        return
      case 401:
        await this._authService.logout(false)
        return
      default:
        return message
    }
  }
}
