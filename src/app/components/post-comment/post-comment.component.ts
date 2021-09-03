import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bt-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() commenterName = '';
  @Input() commenterEmail = '';
  @Input() comment = '';

  constructor() { }

  ngOnInit(): void {
  }
}
