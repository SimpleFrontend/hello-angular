import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { calcBindingFlags } from '@angular/core/src/view/util';

export type ToDoItem = {
  id: number;
  content: string;
  status: number;
};

// 0 - new
// 1 - in progress
// 2 - done

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

  changeStatus({ id, status }) {
    const updatedItems = findAndReplace(
      this.toDoItems.getValue(),
      item => item.id === id,
      { status },
    );
    this.toDoItems.next(updatedItems);
  }

  deleteItem(id) {
    const updatedItems = this.toDoItems
      .getValue()
      .filter(item => item.id !== id);
    this.toDoItems.next(updatedItems);
  }
}

function findAndReplace(arr, findFn, value) {
  const index = arr.findIndex(findFn);
  return index > -1
    ? [
        ...arr.slice(0, index),
        { ...arr[index], ...value },
        ...arr.slice(index + 1, arr.length),
      ]
    : arr;
}
