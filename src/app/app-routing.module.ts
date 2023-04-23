import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './config/auth/auth.guard';
import { GuestGuard } from './config/auth/guest.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {

                path: '', component: AppLayoutComponent,
                children: [
                  { canActivate: [AuthGuard], path: 'category', loadChildren: () => import('./demo/components/category/category.module').then(m => m.CategotyModule) }
                ]
            },
            { canActivate: [GuestGuard],  path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
