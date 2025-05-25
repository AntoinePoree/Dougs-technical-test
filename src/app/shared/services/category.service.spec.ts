import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { mockCategories } from '../mocks/category.mock';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllCategories', () => {
    it('should make a GET request to /all-categories and return the categories', () => {
      service.getAllCategories().subscribe(categories => {
        expect(categories).toEqual(mockCategories);
      });

      const req = httpTestingController.expectOne('/all-categories');
      expect(req.request.method).toBe('GET');
      req.flush(mockCategories);
    });
  });

  describe('getVisibleCategories', () => {
    it('should make a GET request to /visible-categories and return only visible categories', () => {
      const mockVisibleCategories = mockCategories.filter(cat => cat.id === 1 || cat.id === 3);
      service.getVisibleCategories().subscribe(categories => {
        expect(categories).toEqual(mockVisibleCategories);
      });

      const req = httpTestingController.expectOne('/visible-categories');
      expect(req.request.method).toBe('GET');
      req.flush(mockVisibleCategories);
    });
  });

  describe('categoryGroup rxResource', () => {
    it('should have a default value of an empty array initially', () => {
      expect(service.categoryGroup.value()).toEqual([]);
    });

    xit('should load all categories using getAllCategories when its value is accessed', fakeAsync(() => {
      const initialValue = service.categoryGroup.value();
      expect(initialValue).toEqual([]);

      const req = httpTestingController.expectOne('/all-categories');
      expect(req.request.method).toBe('GET');
      req.flush(mockCategories);

      tick();

      expect(service.categoryGroup.value()).toEqual(mockCategories);
    }));
  });

  describe('categoryVisible rxResource', () => {
    it('should have a default value of an empty array initially', () => {
      expect(service.categoryVisible.value()).toEqual([]);
    });

    xit('should load visible categories using getVisibleCategories when its value is accessed', fakeAsync(() => {
      const mockVisibleCategories = mockCategories.filter(cat => cat.id === 1 || cat.id === 3);

      // :)
      const initialValue = service.categoryVisible.value();
      expect(initialValue).toEqual([]);

      const req = httpTestingController.expectOne('/visible-categories');
      expect(req.request.method).toBe('GET');
      req.flush(mockVisibleCategories);

      tick();

      expect(service.categoryVisible.value()).toEqual(mockVisibleCategories);
    }));
  });
});
