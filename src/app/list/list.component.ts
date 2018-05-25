import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService, ToDoItem } from '../data.service';

const testingData: ToDoItem[] = [
  {
    id: 0,
    content: 'do laundry',
    status: 0,
  },
  {
    id: 1,
    content: 'Wash the dishes',
    status: 1,
  },
  {
    id: 2,
    content: 'buy grocery',
    status: 2,
  },
];
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() userName: string = 'John Doe';
  toDoItems$: Observable<ToDoItem[]>;
  displayedColumns = ['status', 'content', 'delete'];
  constructor(private data: DataService) {}

  ngOnInit() {
    this.toDoItems$ = this.data.toDoItems$;
  }

  deleteItem(id) {
    this.data.deleteItem(id);
  }

  changeStatus(id) {
    this.data.changeStatus({ id });
  }

  getProgressClass(item) {
    console.log(item.status);
    switch (item.status) {
      case 0:
        return 'new';
      case 1:
        return 'done';
      case 2:
        return 'archived';
    }
  }

  getStatusClass(item: ToDoItem): string {
    switch (item.status) {
      case 0:
        return 'new';
      case 1:
        return 'done';
      case 2:
        return 'archived';
    }
  }
}
