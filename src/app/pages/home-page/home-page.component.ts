import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'bt-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  userLoading$: Observable<boolean>;
  users$: Observable<any>;
  userPostsLoading$: Observable<boolean>;
  postCommentsLoading$: Observable<boolean | number>;
  userPosts: any[] = [];
  postComments: any = {};
  userPostsToShow: any[] = [];
  postsToShowInitially = 3;

  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {
    this.userLoading$ = this.userService.userLoading$;
    this.userPostsLoading$ = this.postService.userPostsLoading$;
    this.postCommentsLoading$ = this.postService.postCommentsLoading$;

    this.users$ = this.userService.getUsers();
  }

  ngOnInit(): void {
  }

  getUserPosts(userId: number) {
    this.postService.getUserPosts(userId)
      .subscribe((userPosts: any) => {
        this.userPosts = userPosts;
        this.userPostsToShow = userPosts.slice(0, this.postsToShowInitially);
      });
  }

  getPostComments(postId: number) {
    this.postService.getPostComments(postId)
      .subscribe((comments) => {
        this.postComments[postId] = comments;
      });
  }

  showAllPosts() {
    this.userPostsToShow = [...this.userPosts];
  }
}
