import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from './service/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: MenuItem[] = [];

  constructor(public layoutService: LayoutService, public authService: AuthService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Module',
                items: [
                    { label: 'Category', icon: 'pi pi-fw pi-home', routerLink: ['/category/index'] }
                ]
            },
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-sign-in',
                items: [
                    {
                        label: 'Logout',
                        icon: 'pi pi-fw pi-sign-in',
                        command: (() => this.logout())
                    },
                ]
            },

        ];
    }

  async logout(): Promise<void> {
    await this.authService.logout()
  }
}
