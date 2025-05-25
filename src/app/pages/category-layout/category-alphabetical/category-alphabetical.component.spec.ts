import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CategoryItemComponent } from '../../../shared/components/category-item/category-item.component';
import { mockCategories } from '../../../shared/mocks/category.mock';
import { CategoryFilterService } from '../../../shared/services/category-filter.service';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryAlphabeticalComponent } from './category-alphabetical.component';

describe('CategoryAlphabeticalComponent (template)', () => {
  let component: CategoryAlphabeticalComponent;
  let fixture: ComponentFixture<CategoryAlphabeticalComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let filterServiceSpy: jasmine.SpyObj<CategoryFilterService>;

  beforeEach(async () => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', [], {
      categoryMixed: () => mockCategories,
    });

    filterServiceSpy = jasmine.createSpyObj('CategoryFilterService', [], {
      getSearchText: () => '',
      getSelectedGroup: () => 'all',
    });

    await TestBed.configureTestingModule({
      imports: [CategoryAlphabeticalComponent, CategoryItemComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: CategoryFilterService, useValue: filterServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryAlphabeticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render one app-category-item per category', () => {
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('app-category-item'));
    expect(items.length).toBe(5);
  });

  it('should not show no-category message if categories exist', () => {
    const noCategory = fixture.nativeElement.querySelector('.no-category');
    expect(noCategory).toBeNull();
  });

  // describe('matchesGroup logic', () => {
  //   it('should show all categories when selectedGroup is "all"', () => {
  //     filterServiceSpy.getSelectedGroup.and.returnValue('all');
  //     fixture.detectChanges();
  //     const items = fixture.debugElement.queryAll(By.css('app-category-item'));
  //     expect(items.length).toBe(5);
  //   });

  //   it('should show only categories matching the selected group ID', () => {
  //     filterServiceSpy.getSelectedGroup.and.returnValue('1');
  //     fixture.detectChanges();
  //     const items = fixture.debugElement.queryAll(By.css('app-category-item'));
  //     expect(items.length).toBe(1);
  //   });

  //   it('should show no categories when selected group ID does not match any category', () => {
  //     filterServiceSpy.getSelectedGroup.and.returnValue('999');
  //     fixture.detectChanges();
  //     const items = fixture.debugElement.queryAll(By.css('app-category-item'));
  //     expect(items.length).toBe(0);
  //   });

  //   it('should handle categories without group property', () => {
  //     const categoriesWithoutGroup = [...mockCategories];
  //     categoriesWithoutGroup[0].group = undefined;
  //     categoryServiceSpy.categoryMixed.and.returnValue(categoriesWithoutGroup);

  //     filterServiceSpy.getSelectedGroup.and.returnValue('1');
  //     fixture.detectChanges();
  //     const items = fixture.debugElement.queryAll(By.css('app-category-item'));
  //     expect(items.length).toBe(0);
  //   });
  // });
});
