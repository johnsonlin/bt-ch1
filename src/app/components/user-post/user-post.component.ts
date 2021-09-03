import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bt-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {
  @Input() title = '';
  @Input() body = '';
  @Input() comments: any[] = [];
  @Input() commentsLoading = false;
  @Output() postExpand = new EventEmitter();
  postExpanded = false;

  constructor() { }

  ngOnInit(): void {
  }

  expandPost() {
    this.postExpand.emit();
    this.postExpanded = true;
  }
}
