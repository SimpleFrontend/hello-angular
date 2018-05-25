import { Injectable } from '@angular/core';

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
  toDoItems: ToDoItem[] = [];
  constructor() {
    this.toDoItems = testingData;
  }

  changeStatus({ id, status }) {
    this.toDoItems = findAndReplace(this.toDoItems, item => item.id === id, {
      status,
    });
  }

  deleteItem(id) {
    this.toDoItems = this.toDoItems.filter(item => item.id !== id);
  }
}

function findAndReplace(arr, findFn, value) {
  const index = arr.findIndex(findFn);
  console.log(index);
  console.log([
    ...arr.slice(0, index),
    { ...arr[index], ...value },
    ...arr.slice(index + 1, arr.length),
  ]);
  return index
    ? [
        ...arr.slice(0, index),
        { ...arr[index], ...value },
        ...arr.slice(index + 1, arr.length),
      ]
    : arr;
}
