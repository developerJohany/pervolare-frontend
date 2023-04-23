import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode} from 'primeng/api';
import { NodeService } from 'src/app/demo/service/node.service';
import { Category } from 'src/app/demo/components/category/model/Category';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';




@Component({
    templateUrl: './formcategory.component.html',
    providers: [MessageService]
})
export class FormCategoyDemoComponent implements OnInit {
   @ViewChild('modal') modal!: Dialog
    public frmCategory: FormGroup;
    public visible!: boolean;
    type: any;
    files: TreeNode[] = [];
    itemId: number | null = null;
    cols: any[] = [];
    listCategory = [];

  constructor(
    private nodeService: NodeService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ){
    this.frmCategory = this.formBuilder.group({
      code: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      id_parent_category : [null],
    });
  }


    ngOnInit() {
      this.loadTreeTable()
    }

    public save(){
      let objeto: Category = new Category();
      objeto.code = this.frmCategory.controls['code'].value;
      objeto.title = this.frmCategory.controls['title'].value;
      objeto.description = this.frmCategory.controls['description'].value;
      objeto.id_parent_category = this.frmCategory.controls['id_parent_category'].value;
      return  this.nodeService.createCategory(objeto).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category saved successfully' });
        this.frmCategory.reset();
        this.files = [];
        this.loadTreeTable()
      }, error => {
        alert('Error al guardar')
      });
    }

    public loadTreeTable(){
      this.nodeService.listCategory().then(res => {
        this.listCategory = res.list
        this.files = res.data
      });
      console
      this.cols = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Nombre' }
      ];
    }

    showDialog(id: number, type: string) {
      this.itemId = id
      console.log( this.itemId)
      this.visible = true;
      this.type =type;
    }

    closeModal(e: boolean) {
      this.visible = e
    }

    onSave() {
      this.files = [];
      this.loadTreeTable()
      this.visible = false;
    }

    delete(id: number){
      this.nodeService.delete(id).subscribe((res)=>{
        this.messageService.add({ severity: 'info', summary: 'info', detail: 'Category delete successfully' })
        this.files = [];
        this.loadTreeTable()
      })
    }

}

