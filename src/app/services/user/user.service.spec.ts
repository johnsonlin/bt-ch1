import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { usersData } from '../../test-utils/user.service.mock';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', (done) => {
    service.getUsers()
      .subscribe((data) => {
        expect(data).toEqual(usersData);
        done();
      });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users');

    expect(req.request.method).toBe('GET');

    req.flush(usersData);
  });
});
