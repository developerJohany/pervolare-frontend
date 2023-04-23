import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormCategoyDemoComponent } from './formcategory.component';
import { FormCategoryDemoRoutingModule } from './formcategory-routing.module';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { TreeTableModule } from 'primeng/treetable';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { EditCategoryComponent } from './modal/edit-category/edit-category.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FormCategoryDemoRoutingModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
    TreeTableModule,
    ReactiveFormsModule,
    ToastModule,
    DialogModule,
    ButtonModule
	],
	declarations: [FormCategoyDemoComponent, EditCategoryComponent]
})
export class FormCategoryDemoModule { }
