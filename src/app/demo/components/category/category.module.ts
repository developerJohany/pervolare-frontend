import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
	imports: [
		CommonModule,
		CategoryRoutingModule,
    FormsModule
	]
})
export class CategotyModule { }
