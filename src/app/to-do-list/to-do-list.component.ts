import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService, ToDoItem } from '../data.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  @Input() userName: string = 'John Doe';
  toDoItems$: Observable<ToDoItem[]>;
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
