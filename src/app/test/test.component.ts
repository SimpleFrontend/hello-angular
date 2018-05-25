import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '../data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  posts$: Observable<any[]>;
  postsSubscription: Subscription;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.posts$ = this.data
      .posts$()
      .pipe(map((posts: any[]) => posts.find(post => post.id === 1)));

    this.postsSubscription = this.posts$.subscribe(post => console.log(post));
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
