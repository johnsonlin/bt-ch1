import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

import { HomePageComponent } from './home-page.component';
import { MaterialModule } from '../../material/material.module';
import { UserService } from '../../services/user/user.service';
import { PostService } from '../../services/post/post.service';
import { usersData, userServiceMock } from '../../test-utils/user.service.mock';
import { commentsData, postsData, postServiceMock } from '../../test-utils/post.service.mock';
import { PipesModule } from '../../pipes/pipes.module';
import { UserPostComponent } from '../../components/user-post/user-post.component';
import { ComponentsModule } from '../../components/components.module';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [
        MaterialModule,
        PipesModule,
        ComponentsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: PostService, useValue: postServiceMock },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    userServiceMock.reset();
    postServiceMock.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Users retrieving', () => {
    beforeEach(() => {
      userServiceMock.userLoading$.next(true);
      fixture.detectChanges();
    });

    it('should only show loading indicator when retrieving users', () => {
      const loadingIndicator = fixture.debugElement.query(By.css('.home__user-loading-indicator'));
      const mainContent = fixture.debugElement.nativeElement.querySelector('[data-automation-id="main-content"]');

      expect(loadingIndicator).not.toBeNull();
      expect(mainContent).toBeNull();
    });
  });


  describe('Users retrieved', () => {
    beforeEach(() => {
      userServiceMock.usersData$.next(usersData);
      fixture.detectChanges();
    });

    it('should show main content and hide loading indicator after users are retrieved', () => {
      const loadingIndicator = fixture.debugElement.nativeElement.querySelector('.home__user-loading-indicator');
      const mainContent = fixture.debugElement.nativeElement.querySelector('[data-automation-id="main-content"]');

      expect(loadingIndicator).toBeNull();
      expect(mainContent).not.toBeNull();
    });

    it('should show a list of users', () => {
      const userListItems = fixture.debugElement.nativeElement.querySelectorAll('.home__user-list-item');

      expect(userListItems.length).toBe(3);
    });

    it('should not show posts', () => {
      const userPosts = fixture.debugElement.nativeElement.querySelector('.home__user-posts');

      expect(userPosts).toBeNull();
    });

    it('should get user posts when a user is selected from the list', () => {
      const userList = fixture.debugElement.query(By.directive(MatButtonToggleGroup));
      const getUserPostsSpy = spyOn(component, 'getUserPosts').and.callThrough();

      userList.triggerEventHandler('change', { value: 1 });

      expect(getUserPostsSpy).toHaveBeenCalledOnceWith(1);
      expect(postServiceMock.getUserPosts).toHaveBeenCalledOnceWith(1);
    });

    describe('Retrieving posts', () => {
      beforeEach(() => {
        postServiceMock.userPostsLoading$.next(true);
        fixture.detectChanges();
      });

      it('should show a loading indicator', () => {
        const loadingIndicator = fixture.debugElement.nativeElement.querySelector('[data-automation-id="post-loading"]');

        expect(loadingIndicator).not.toBeNull();
      });
    });

    describe('Posts retrieved', () => {
      beforeEach(() => {
        const userList = fixture.debugElement.query(By.directive(MatButtonToggleGroup));

        userList.triggerEventHandler('change', { value: 1 });
        postServiceMock.userPosts$.next(postsData);
        fixture.detectChanges();
      });

      it('should hide the loading indicator and show a post list', () => {
        const loadingIndicator = fixture.debugElement.nativeElement.querySelector('[data-automation-id="post-loading"]');
        const postList = fixture.debugElement.nativeElement.querySelector('.home__user-posts');

        expect(loadingIndicator).toBeNull();
        expect(postList).not.toBeNull();
      });

      it('should only load 3 initial posts', () => {
        const postItems = fixture.debugElement.nativeElement.querySelectorAll('.home__user-post');
        const userPostComponents = fixture.debugElement.queryAll(By.directive(UserPostComponent));

        expect(postItems.length).toBe(3);
        expect(userPostComponents.length).toBe(3);
      });

      it('should have a Load all button', () => {
        const loadAll = fixture.debugElement.nativeElement.querySelector('.home__load-all');
        const buttonElement = loadAll.querySelector('button');

        expect(loadAll).not.toBeNull();
        expect(buttonElement).not.toBeNull();
      });

      it('should show all posts when Load all button is clicked', () => {
        const loadAllButton = fixture.debugElement.query(By.css('.home__load-all button'));
        const showAllPostSpy = spyOn(component, 'showAllPosts').and.callThrough();

        loadAllButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const postItems = fixture.debugElement.nativeElement.querySelectorAll('.home__user-post');
        const userPostComponents = fixture.debugElement.queryAll(By.directive(UserPostComponent));

        expect(showAllPostSpy).toHaveBeenCalled();
        expect(postItems.length).toBe(5);
        expect(userPostComponents.length).toBe(5);
      });

      it('should hide Load all button when all posts are shown', () => {
        const loadAllButton = fixture.debugElement.query(By.css('.home__load-all button'));

        loadAllButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const loadAll = fixture.debugElement.nativeElement.querySelector('.home__load-all');

        expect(loadAll).toBeNull();
      });

      it('should get comments of a post when the post is expanded', () => {
        const firstPost = fixture.debugElement.query(By.directive(UserPostComponent));
        const getPostCommentsSpy = spyOn(component, 'getPostComments').and.callThrough();

        firstPost.triggerEventHandler('postExpand', null);

        expect(getPostCommentsSpy).toHaveBeenCalledOnceWith(1);
        expect(postServiceMock.getPostComments).toHaveBeenCalledOnceWith(1);
      });

      describe('Retrieving comments', () => {
        let firstPost: DebugElement;

        beforeEach(() => {
          firstPost = fixture.debugElement.query(By.directive(UserPostComponent));

          firstPost.triggerEventHandler('postExpand', null);
          postServiceMock.postCommentsLoading$.next(1);
          fixture.detectChanges();
        });

        it('should show a loading indicator', () => {
          expect(firstPost.componentInstance.commentsLoading).toBe(true);
        });
      });

      describe('Comments retrieved', () => {
        let firstPost: DebugElement;

        beforeEach(() => {
          firstPost = fixture.debugElement.query(By.directive(UserPostComponent));

          firstPost.triggerEventHandler('postExpand', null);
          postServiceMock.postComments$.next(commentsData);
          fixture.detectChanges();
        });

        it('should hide the loading indicator and show a comment list', () => {
          expect(firstPost.componentInstance.commentsLoading).toBe(false);
          expect(component.postComments[1]).toEqual(commentsData);
          expect(firstPost.componentInstance.comments).toEqual(commentsData);
        });
      });
    });
  });
});
