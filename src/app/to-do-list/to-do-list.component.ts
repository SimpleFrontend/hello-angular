import { Component, OnInit } from '@angular/core';
import { DataService, ToDoItem } from '../data.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  toDoItems: ToDoItem[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.toDoItems = this.dataService.toDoItems;
  }
}
