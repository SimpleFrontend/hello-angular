import { Component, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService, ToDoItem } from '../data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnChanges {
  itemForm: FormGroup;
  constructor(private data: DataService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnChanges() {}

  createForm() {
    this.itemForm = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

  onSubmit() {
    const itemToSave = this.prepareSaveItem();
    this.data.addItem(itemToSave);
    this.itemForm.setValue({ content: '' });
  }

  prepareSaveItem() {
    const formValue = this.itemForm.value;
    return { ...formValue, status: 0 };
  }

  addItem(content: string) {
    this.data.addItem({ content, status: 0 });
  }
}
