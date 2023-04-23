import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/layout/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [JwtHelperService]
})
export class LoginComponent {

    email = ''
    password = ''
    errorText = ''
    successfulText = ''
    loading = false
    currentYear: number = new Date().getFullYear()
    loginForm = true
    resetPasswordForm = false
    forgotPasswordForm = false
    decodeToken: { sub?: string } = {}

    valCheck: string[] = ['remember'];

    constructor(
      public layoutService: LayoutService,
      private authService: AuthService,
      private jwtHelper: JwtHelperService,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.loginForm = true
  }

  loginUser(): void {
    this.errorText = ''
    if (this.email == '' || this.password == '') {
      this.errorText = 'Llenar todos los campos obligatorios'
      alert('Llenar todos los campos obligatorios')
      return
    }

    const credentials: any = {
      email: this.email,
      password: this.password
    }

    this.authService.validateCredentials(credentials).subscribe((res) => {
      if (res.status == 'success') {
        console.log(res)
        const token = res.data.token
        this.storeToken(token)
      }
      if (res.status == 'error') {
        this.errorText = res.message
      }
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storeToken(token: string) {
    localStorage.setItem('token', token)
    this.router.navigateByUrl('/category/index')
  }

}
