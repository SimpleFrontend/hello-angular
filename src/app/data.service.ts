import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { calcBindingFlags } from '@angular/core/src/view/util';

export type ToDoItem = {
  id?: number;
  content: string;
  status: number;
};

// 0 - new
// 1 - done
// 2 - archived

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
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private toDoItems: BehaviorSubject<ToDoItem[]>;
  toDoItems$: Observable<ToDoItem[]>;

  constructor() {
    this.toDoItems = new BehaviorSubject<ToDoItem[]>(testingData);
    this.toDoItems$ = this.toDoItems.asObservable();
  }

  changeStatus({ id }) {
    const currentItems = this.toDoItems.getValue();
    const modifier = item => ({
      ...item,
      status: item.status < 2 ? item.status + 1 : 0,
    });
    const updatedItems = findAndReplace(
      currentItems,
      item => item.id === id,
      modifier,
    );
    this.toDoItems.next(updatedItems);
  }

  deleteItem(id) {
    const updatedItems = this.toDoItems
      .getValue()
      .filter(item => item.id !== id);
    this.toDoItems.next(updatedItems);
  }

  addItem(item: ToDoItem) {
    const previousItems = this.toDoItems.getValue();
    const newItem = {
      ...item,
      id: previousItems[previousItems.length - 1].id + 1,
    };
    const updatedItems = [...previousItems, newItem];
    this.toDoItems.next(updatedItems);
  }
}

function findAndReplace(arr, findFn, modifier) {
  const index = arr.findIndex(findFn);
  const item = modifier(arr[index]);
  return index > -1
    ? [...arr.slice(0, index), item, ...arr.slice(index + 1, arr.length)]
    : arr;
}
