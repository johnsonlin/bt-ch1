import { NgModule } from '@angular/core';
import { UserPostComponent } from './user-post/user-post.component';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { PostCommentComponent } from './post-comment/post-comment.component';

@NgModule({
  declarations: [
    UserPostComponent,
    PostCommentComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    UserPostComponent,
    PostCommentComponent,
  ],
})
export class ComponentsModule {
}
