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
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  @Input() userName: string = 'John Doe';
  toDoItems$: Observable<ToDoItem[]>;
  displayedColumns = ['content', 'status', 'action'];
  constructor(private data: DataService) {}

  ngOnInit() {
    this.toDoItems$ = this.data.toDoItems$;
  }

  deleteItem(id) {
    this.data.deleteItem(id);
  }

  changeStatus(id, status) {
    this.data.changeStatus({ id, status });
  }
}
