import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIkitRoutingModule } from './uikit-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
	imports: [
		CommonModule,
		UIkitRoutingModule,
    FormsModule
	]
})
export class UIkitModule { }
