import { FirstNamePipe } from './first-name.pipe';

describe('FirstNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('should output first name if name starts with a title', () => {
    const pipe = new FirstNamePipe();
    let name = 'Mr. Test Testerson';

    expect(pipe.transform(name)).toBe('Test');

    name = 'Mrs. Test Testerson';
    expect(pipe.transform(name)).toBe('Test');

    name = 'Ms. Test Testerson';
    expect(pipe.transform(name)).toBe('Test');

    name = 'Mx. Test Testerson';
    expect(pipe.transform(name)).toBe('Test');

    name = 'Miss Test Testerson';
    expect(pipe.transform(name)).toBe('Test');

    name = 'Master Test Testerson';
    expect(pipe.transform(name)).toBe('Test');

    name = 'Maid Test Testerson';
    expect(pipe.transform(name)).toBe('Test');

    name = 'Madam Test Testerson';
    expect(pipe.transform(name)).toBe('Test');

    name = 'Madame Test Testerson';
    expect(pipe.transform(name)).toBe('Test');
  });

  it('should output first name if name does not start with a title', () => {
    const name = 'Test Testerson';
    const pipe = new FirstNamePipe();

    expect(pipe.transform(name)).toBe('Test');
  });
});
