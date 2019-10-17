import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../model/post';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';



 


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})


export class TimelineComponent implements OnInit {

  constructor(private postService: PostService,
            private authService: AuthenticationService,
            private router: Router) { }

  posts = [
    {'author': 'Andy Le', 'message': 'I hate going to the gym'},
    {'author': 'Kimberly Ngo', 'message': 'I love cats'},
    {'author': 'Danny Giap', 'message': 'I am gay'},
    {'author': 'Richard Tran', 'message': 'I love popeyes'}
  ];

  getPosts(): void {
    this.postService.getPosts() 
      .subscribe(posts => this.posts = posts);
  }

  ngOnInit() {
    this.getPosts();

  }


}
