import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

import { Post } from '../model/post';
import { AuthenticationService } from '../authentication.service';
import { PostService } from '../post.service';
import { Comment } from '../model/comment';
 


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private postService: PostService
  ) {
  
   }


  ngOnInit() {
    // Checkes if there are more comments to be displayed
    if(this.post.comments) {
      this.numTotalComments = this.post.comments.length
      if(this.numTotalComments == 0) {
        this.showSeeMore = false;
      }
      else if(this.numTotalComments <= this.numCommentsDisplayed) {
        this.numCommentsDisplayed = this.numTotalComments;
        this.showSeeMore = false;
      }
    } else {
      this.numTotalComments = 0;
    }
    this.checkLike();
  }

  checkLike(): void {
    // check if current user has liked this post
    if(this.post.likes) {
      if(this.post.likes.includes(this.authService.currentUserValue._id)) {
        this.liked = true;
        return;
      } 
    } 
    this.liked = false;
    
  }

  liked: boolean;
  @ViewChild("commentInput", {static: false}) inputEl: ElementRef;
  @Output()
  reloadTimeline = new EventEmitter<String>();

  numCommentsDisplayed: number = 3;
  numTotalComments: number;
  showSeeMore: boolean = true;

  @Input() post:Post;
  date: Number = Date.now();
  comment: string = '';
  createComment(): void {
    let comment = new Comment(this.authService.currentUserValue.firstName + " " + this.authService.currentUserValue.lastName,
                                this.comment);
    this.postService.commentOnPost(this.post._id, comment)
      .subscribe(() => {
        this.reloadTimeline.emit('trigger');
        this.comment='';
      });
  }

  focusOnInput(el: HTMLElement): void {
    this.inputEl.nativeElement.focus();
    el.scrollIntoView({behavior:"smooth"});
  }

  moreComments(): void {
    this.numCommentsDisplayed+=3;

    if(this.numCommentsDisplayed >= this.post.comments.length  ) {
      this.numCommentsDisplayed = this.numTotalComments;
      this.showSeeMore = false;
    }

  }
  
  formatLikeCount(likeCount: number): string {
    if(likeCount == 1) {
      return likeCount + " " + "like";
    } else {
      return likeCount + " " + "likes";

    }
  }

  likeOrUnlikePost(): void {
    console.log("Hello");
    this.postService.likeOrUnlikePost(this.post._id, this.authService.currentUserValue._id)
      .subscribe(() => {
        if(this.liked) {
          this.post.likeCount--;
          let index = this.post.likes.indexOf(this.authService.currentUserValue._id);
          if (index !== -1) this.post.likes.splice(index, 1);
        } else {
          this.post.likeCount++;
          this.post.likes.push(this.authService.currentUserValue._id);
        }
        this.ngOnInit();

      })
  }

}
