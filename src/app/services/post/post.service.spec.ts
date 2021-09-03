import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostService } from './post.service';
import { commentsData, postsData } from '../../test-utils/post.service.mock';

describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts from a given user', (done) => {
    service.getUserPosts(123)
      .subscribe((data) => {
        expect(data).toEqual(postsData);
        done();
      });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users/123/posts');

    expect(req.request.method).toBe('GET');

    req.flush(postsData);
  });

  it('should get post comments', (done) => {
    service.getPostComments(123)
      .subscribe((data) => {
        expect(data).toEqual(commentsData);
        done();
      });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts/123/comments');

    expect(req.request.method).toBe('GET');

    req.flush(commentsData);
  });
});
