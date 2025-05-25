import { TestBed } from '@angular/core/testing';
import { CategoryFilterService } from './category-filter.service';

describe('CategoryFilterService', () => {
  let service: CategoryFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryFilterService],
    });
    service = TestBed.inject(CategoryFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Search Text', () => {
    it('should initialize with empty search text', () => {
      expect(service.getSearchText()).toBe('');
    });

    it('should update search text when setSearchText is called', () => {
      const testText = 'test search';
      service.setSearchText(testText);
      expect(service.getSearchText()).toBe(testText);
    });

    it('should handle empty string in search text', () => {
      service.setSearchText('');
      expect(service.getSearchText()).toBe('');
    });

    it('should handle multiple search text updates', () => {
      service.setSearchText('first');
      expect(service.getSearchText()).toBe('first');

      service.setSearchText('second');
      expect(service.getSearchText()).toBe('second');

      service.setSearchText('third');
      expect(service.getSearchText()).toBe('third');
    });
  });

  describe('Selected Group', () => {
    it('should initialize with "all" as selected group', () => {
      expect(service.getSelectedGroup()).toBe('all');
    });

    it('should update selected group when setSelectedGroup is called', () => {
      const testGroup = '1';
      service.setSelectedGroup(testGroup);
      expect(service.getSelectedGroup()).toBe(testGroup);
    });

    it('should handle "all" as selected group', () => {
      service.setSelectedGroup('all');
      expect(service.getSelectedGroup()).toBe('all');
    });

    it('should handle numeric group IDs', () => {
      service.setSelectedGroup('123');
      expect(service.getSelectedGroup()).toBe('123');
    });

    it('should handle multiple group selection updates', () => {
      service.setSelectedGroup('1');
      expect(service.getSelectedGroup()).toBe('1');

      service.setSelectedGroup('2');
      expect(service.getSelectedGroup()).toBe('2');

      service.setSelectedGroup('all');
      expect(service.getSelectedGroup()).toBe('all');
    });
  });

  describe('Computed Values', () => {
    it('should return computed search text value', () => {
      const testText = 'computed test';
      service.setSearchText(testText);
      expect(service.getSearchText()).toBe(testText);
    });

    it('should return computed selected group value', () => {
      const testGroup = 'computed-group';
      service.setSelectedGroup(testGroup);
      expect(service.getSelectedGroup()).toBe(testGroup);
    });

    it('should maintain separate computed values for search and group', () => {
      service.setSearchText('search value');
      service.setSelectedGroup('group value');

      expect(service.getSearchText()).toBe('search value');
      expect(service.getSelectedGroup()).toBe('group value');
    });
  });
});
