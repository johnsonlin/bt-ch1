import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserPostComponent } from './user-post.component';
import { MaterialModule } from '../../material/material.module';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { commentsData } from '../../test-utils/post.service.mock';

describe('UserPostComponent', () => {
  let component: UserPostComponent;
  let fixture: ComponentFixture<UserPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPostComponent, PostCommentComponent ],
      imports: [
        MaterialModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostComponent);
    component = fixture.componentInstance;
    component.title = 'test title';
    component.body = 'test body';
    component.comments = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show post title', () => {
    const title = fixture.debugElement.nativeElement.querySelector('mat-card-title');

    expect(title.textContent).toBe('test title');
  });

  it('should show post body', () => {
    const body = fixture.debugElement.nativeElement.querySelector('.user-post__main-body > p');

    expect(body.textContent).toBe('test body');
  });

  it('should have a expand button', () => {
    const expandButton = fixture.debugElement.nativeElement.querySelector('.user-post__expand-button');

    expect(expandButton).not.toBeNull();
  });

  it('should emit event when expand button is clicked', () => {
    const expandButton = fixture.debugElement.query(By.css('.user-post__expand-button'));
    const emitSpy = spyOn(component.postExpand, 'emit');

    expandButton.triggerEventHandler('click', null);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should show comments if comments is not empty', () => {
    component.comments = commentsData;
    fixture.detectChanges();

    const commentsHeader = fixture.debugElement.nativeElement.querySelector('[data-automation-id="comment-header"]');
    const commentList = fixture.debugElement.nativeElement.querySelector('.user-post__comments');
    const commentItems = fixture.debugElement.nativeElement.querySelectorAll('.user-post__comment');
    const postCommentComponents = fixture.debugElement.queryAll(By.directive(PostCommentComponent));

    expect(commentsHeader.textContent).toBe('Comments');
    expect(commentList).not.toBeNull();
    expect(commentItems.length).toBe(3);
    expect(postCommentComponents.length).toBe(3);
  });

  it('should not show expand button after it is clicked', () => {
    expect(component.postExpanded).toBe(false);

    const expandButton = fixture.debugElement.query(By.css('.user-post__expand-button'));

    expandButton.triggerEventHandler('click', null);
    expect(component.postExpanded).toBe(true);
    fixture.detectChanges();

    const expandButtonElement = fixture.debugElement.nativeElement.querySelector('.user-post__expand-button');

    expect(expandButtonElement).toBeNull();
  });

  it('should show loading indicator when commentsLoading is true', () => {
    component.commentsLoading = true;
    fixture.detectChanges();

    const loadingIndicator = fixture.debugElement.nativeElement.querySelector('[data-automation-id="comments-loading"]');

    expect(loadingIndicator).not.toBeNull();
  });
});
