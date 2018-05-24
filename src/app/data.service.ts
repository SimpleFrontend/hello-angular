import { Injectable } from '@angular/core';

type ToDoItem = {
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

export class DataService {
  toDoItems: ToDoItem[] = [];
  constructor() {
    this.toDoItems = testingData;
  }
}
