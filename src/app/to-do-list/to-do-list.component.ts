import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataService, ToDoItem } from '../data.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnChanges {
  @Input() userName: string = 'John Doe';
  toDoItems: ToDoItem[] = [];
  constructor(private data: DataService) {}

  ngOnChanges() {
    this.toDoItems = this.data.toDoItems;
  }

  getItem({ id, content, status }) {
    return `${id}-${content}-${status}`;
  }

  deleteItem(id) {
    this.data.deleteItem(id);
  }

  changeStatus(id, status) {
    this.data.changeStatus({ id, status });
  }
}
