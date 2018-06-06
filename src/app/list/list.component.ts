import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService, ToDoItem } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  allToDoItems$: Observable<ToDoItem[]>;
  newToDoItems$: Observable<ToDoItem[]>;
  doneToDoItems$: Observable<ToDoItem[]>;

  constructor(private data: DataService) {}

  ngOnInit() {
    const toDoItems$ = this.data.fetch$();
    this.allToDoItems$ = toDoItems$.pipe(
      map(items => {
        const formattedItems = [...items].map(item => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        return formattedItems.sort(
          (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
        );
      }),
    );
    this.newToDoItems$ = this.allToDoItems$.pipe(
      map(items => [...items].filter(item => item.status === 0)),
    );
    this.doneToDoItems$ = this.allToDoItems$.pipe(
      map(items => [...items].filter(item => item.status === 1)),
    );
  }

  deleteItem(id) {
    this.data.deleteItem$(id);
  }

  changeStatus(id) {
    this.data.changeStatus$(id);
  }

  getProgressClass(item) {
    switch (item.status) {
      case 0:
        return 'new';
      case 1:
        return 'done';
    }
  }
}
