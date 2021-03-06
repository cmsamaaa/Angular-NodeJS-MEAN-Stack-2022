import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";

import {Post} from "../post.model";
import {PostsService} from "../post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the first post\'s content'},
  //   {title: 'Third Post', content: 'This is the first post\'s content'}
  // ];
  public posts: Post[] = [];
  public isLoading = false;
  // private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    // this.postsSub.unsubscribe();
  }
}

