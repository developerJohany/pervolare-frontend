import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'index', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./formcategory/formcategory.module').then(m => m.FormCategoryDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }
