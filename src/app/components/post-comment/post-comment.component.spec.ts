import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentComponent } from './post-comment.component';

describe('PostCommentComponent', () => {
  let component: PostCommentComponent;
  let fixture: ComponentFixture<PostCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentComponent);
    component = fixture.componentInstance;
    component.commenterName = 'test commenter';
    component.comment = 'test comment';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show name field', () => {
    const nameElement = fixture.debugElement.nativeElement.querySelector('[data-automation-id="name"]');

    expect(nameElement.textContent).toBe('test commenter');
  });

  it('should show comment body', () => {
    const commentElement = fixture.debugElement.nativeElement.querySelector('[data-automation-id="comment"]');

    expect(commentElement.textContent).toBe('test comment');
  });

  it('should wrap name with a link if commenterEmail is set', () => {
    component.commenterEmail = 'test@example.com';
    fixture.detectChanges();

    const nameElement = fixture.debugElement.nativeElement.querySelector('[data-automation-id="name"]');
    const linkElement = nameElement.querySelector('a');

    expect(linkElement.href).toBe('mailto:test@example.com');
    expect(linkElement.textContent).toBe('test commenter');
  });
});
