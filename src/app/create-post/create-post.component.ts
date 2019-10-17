import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';


import { AuthenticationService } from '../authentication.service';
import { PostService } from '../post.service';
import { Post } from '../model/post';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @Output()
  reloadTimeline = new EventEmitter<String>();

  @ViewChild('postForm', {static: false}) formValues;

  post: Post;
  constructor(private postService: PostService,
    private authService: AuthenticationService) { 
    this.post = new Post();
    let currentUser = this.authService.currentUserValue;
    this.post.author = currentUser.firstName + " " + currentUser.lastName;
    this.post.message = '';
  }

  ngOnInit() {
  }

  onSubmit(postForm) {
    this.postService.createPost(this.post)
      .subscribe(() => {
        this.reloadTimeline.emit('trigger');
        this.post.message='';
      })
      
  }

  onTextAreaChange(event) {
    console.log("HERE");
    try {
      this.post.message = event.target.value;
      console.log(this.post.message);
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }

}
