import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService, ToDoItem } from '../data.service';

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
    this.toDoItems$ = this.data.toDoItems$.pipe(
      map(items =>
        [...items].sort((a, b) => a.status - b.status || b.id - a.id),
      ),
    );
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
