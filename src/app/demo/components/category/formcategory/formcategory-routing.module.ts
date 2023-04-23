import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormCategoyDemoComponent } from './formcategory.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FormCategoyDemoComponent }
	])],
	exports: [RouterModule]
})
export class FormCategoryDemoRoutingModule { }
