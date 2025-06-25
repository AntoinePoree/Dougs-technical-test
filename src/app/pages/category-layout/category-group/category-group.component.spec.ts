import { provideLocationMocks } from '@angular/common/testing';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { mockCategories } from '../../../shared/mocks/category.mock';
import { CategoryFilterService } from '../../../shared/services/category-filter.service';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryGroupComponent } from './category-group.component';

describe('CategoryGroupComponent', () => {
  let component: CategoryGroupComponent;
  let fixture: ComponentFixture<CategoryGroupComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let filterServiceSpy: jasmine.SpyObj<CategoryFilterService>;

  const refreshComponent = () => {
    fixture = TestBed.createComponent(CategoryGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const getGroups = () => categoryServiceSpy.categoriesByGroupsFiltered();

  beforeEach(async () => {
    const categoryMixedSignal = signal(mockCategories);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', [], {
      categoryMixed: categoryMixedSignal,
    });

    const searchTextSignal = signal('');
    const selectedGroupSignal = signal('all');
    filterServiceSpy = jasmine.createSpyObj('CategoryFilterService', [], {
      getSearchText: searchTextSignal,
      getSelectedGroup: selectedGroupSignal,
    });

    await TestBed.configureTestingModule({
      imports: [CategoryGroupComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: CategoryFilterService, useValue: filterServiceSpy },
        provideRouter([]),
        provideLocationMocks(),
      ],
    }).compileComponents();

    refreshComponent();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should inject required services', () => {
      expect(component.categoryService).toBeTruthy();
    });
  });

  describe('Category Grouping', () => {
    it('should group categories by their group name', () => {
      const groups = getGroups();
      expect(groups.length).toBe(3);
      expect(groups.map(g => g.name)).toEqual(['Group A', 'Group B', 'Sans groupe']);
    });

    it('should handle empty categories array', () => {
      const emptySignal = signal([]);
      Object.defineProperty(categoryServiceSpy, 'categoryMixed', {
        get: () => emptySignal,
      });
      refreshComponent();

      expect(getGroups().length).toBe(0);
    });

    it('should handle categories with null groups', () => {
      const nullGroupsSignal = signal([
        { id: 1, wording: 'Cat 1', description: null, group: null },
        { id: 2, wording: 'Cat 2', description: null, group: null },
      ]);
      Object.defineProperty(categoryServiceSpy, 'categoryMixed', {
        get: () => nullGroupsSignal,
      });
      refreshComponent();

      const groups = getGroups();
      expect(groups.length).toBe(1);
      expect(groups[0].name).toBe('Sans groupe');
      expect(groups[0].categories.length).toBe(2);
    });
  });

  describe('Filtering', () => {
    it('should filter groups based on search text (case insensitive)', () => {
      const searchTextSignal = signal('group a');
      Object.defineProperty(filterServiceSpy, 'getSearchText', {
        get: () => searchTextSignal,
      });
      refreshComponent();

      const groups = getGroups();
      expect(groups.length).toBe(1);
      expect(groups[0].name).toBe('Group A');
    });

    it('should filter groups based on selected group', () => {
      const selectedGroupSignal = signal('1');
      Object.defineProperty(filterServiceSpy, 'getSelectedGroup', {
        get: () => selectedGroupSignal,
      });
      refreshComponent();

      const groups = getGroups();
      expect(groups.length).toBe(1);
      expect(groups[0].name).toBe('Group A');
    });

    it('should show all groups when selected group is "all"', () => {
      const selectedGroupSignal = signal('all');
      Object.defineProperty(filterServiceSpy, 'getSelectedGroup', {
        get: () => selectedGroupSignal,
      });
      refreshComponent();

      expect(getGroups().length).toBe(3);
    });

    it('should combine search text and group filters', () => {
      const searchTextSignal = signal('Group A');
      const selectedGroupSignal = signal('1');
      Object.defineProperty(filterServiceSpy, 'getSearchText', {
        get: () => searchTextSignal,
      });
      Object.defineProperty(filterServiceSpy, 'getSelectedGroup', {
        get: () => selectedGroupSignal,
      });
      refreshComponent();

      const groups = getGroups();
      expect(groups.length).toBe(1);
      expect(groups[0].name).toBe('Group A');
    });

    it('should return empty array when no matches found', () => {
      const searchTextSignal = signal('NonExistentGroup');
      Object.defineProperty(filterServiceSpy, 'getSearchText', {
        get: () => searchTextSignal,
      });
      refreshComponent();

      expect(getGroups().length).toBe(0);
    });

    it('should exclude groups with no matching categories', () => {
      const searchTextSignal = signal('Cat A');
      Object.defineProperty(filterServiceSpy, 'getSearchText', {
        get: () => searchTextSignal,
      });
      refreshComponent();

      const groups = getGroups();
      expect(groups.length).toBe(0);
    });
  });
});
