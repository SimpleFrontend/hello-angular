import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Observable, BehaviorSubject, pipe, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { calcBindingFlags } from '@angular/core/src/view/util';
import { HttpClient } from '@angular/common/http';

export type ToDoItem = {
  id?: number;
  content: string;
  // 0 - new
  // 1 - done
  status: number;
  timestamp?: Date;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private toDoItems: BehaviorSubject<ToDoItem[]>;
  toDoItems$: Observable<ToDoItem[]>;

  constructor(private http: HttpClient) {
    this.toDoItems = new BehaviorSubject<ToDoItem[]>([]);
    this.toDoItems$ = this.toDoItems.asObservable();
  }

  post(toDoItems: ToDoItem[]) {
    localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
  }

  fetch$() {
    // const url = 'https://jsonplaceholder.typicode.com/posts';
    // return this.http.get(url);
    const response = JSON.parse(localStorage.getItem('toDoItems')) || [];
    this.toDoItems.next(response);
    return this.toDoItems$;
  }

  changeStatus$(id) {
    const modifier = item => ({
      ...item,
      status: item.status < 1 ? item.status + 1 : 0,
    });
    const updatedItems = findAndReplace(
      this.toDoItems.getValue(),
      item => item.id === id,
      modifier,
    );
    this.toDoItems.next(updatedItems);
    this.post(updatedItems);
    return this.toDoItems$;
  }

  deleteItem$(id) {
    const updatedItems = this.toDoItems
      .getValue()
      .filter(item => item.id !== id);
    this.toDoItems.next(updatedItems);
    this.post(updatedItems);
    return this.toDoItems$;
  }

  addItem(item) {
    const items = this.toDoItems.getValue();
    const id = uuid();
    const timestamp = new Date();
    const newItem: ToDoItem = { ...item, id, timestamp };
    const updatedItems = [...items, newItem];
    this.toDoItems.next(updatedItems);
    this.post(updatedItems);
    return this.toDoItems$;
  }
}

function findAndReplace(arr, findFn, modifier) {
  const index = arr.findIndex(findFn);
  const item = modifier(arr[index]);
  return index > -1
    ? [...arr.slice(0, index), item, ...arr.slice(index + 1, arr.length)]
    : arr;
}
