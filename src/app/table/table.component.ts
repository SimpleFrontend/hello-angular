import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { ToDoItem } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() toDoItems: ToDoItem[];
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
  @Output() changeStatus: EventEmitter<any> = new EventEmitter();
  displayedColumns = ['status', 'content', 'delete'];

  constructor() {}

  ngOnInit() {}

  delete(id) {
    this.deleteItem.emit(id);
  }

  update(id) {
    this.changeStatus.emit(id);
  }

  getStatusClass(item: ToDoItem): string {
    switch (item.status) {
      case 0:
        return 'new';
      case 1:
        return 'done';
    }
  }
}
