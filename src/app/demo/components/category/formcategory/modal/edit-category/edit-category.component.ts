import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NodeService } from 'src/app/demo/service/node.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCategoryComponent implements OnInit {

  public frmCategory: FormGroup;
  @Input() itemId: number | null = null;
  @Input() visible = false
  @Input() type!: string;
  @Output() closeModal = new EventEmitter<boolean>()
  @Output() onSave = new EventEmitter<boolean>()


  constructor(private nodeService: NodeService, private formBuilder: FormBuilder,private messageService: MessageService) {
    this.frmCategory = this.formBuilder.group({
      code: [null],
      title: [null],
      description: [null],
    });
  }

  ngOnInit() {
  }

  loadData() {
      this.nodeService.show(this.itemId).subscribe((res) => {
        const data = res.data
        this.frmCategory.controls['code'].setValue(data.code)
        this.frmCategory.controls['title'].setValue(data.title)
        this.frmCategory.controls['description'].setValue(data.description)
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['visible'].currentValue) {
        this.loadData()
    }
  }

  close() {
    this.closeModal.emit(false)
  }

  save(){
    const data = {
      code: this.frmCategory.controls['code'].value,
      title: this.frmCategory.controls['title'].value,
      description:  this.frmCategory.controls['description'].value
    };

    this.nodeService.update(this.itemId, data).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category update successfully' });
      this.onSave.emit()
    })
  }

}
