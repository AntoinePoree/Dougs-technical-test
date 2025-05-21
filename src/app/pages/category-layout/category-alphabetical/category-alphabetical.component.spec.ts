import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CategoryItemComponent } from '../../../shared/components/category-item/category-item.component';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { CategoryFilterService } from '../../../shared/services/category-filter.service';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryAlphabeticalComponent } from './category-alphabetical.component';

describe('CategoryAlphabeticalComponent (template)', () => {
  let component: CategoryAlphabeticalComponent;
  let fixture: ComponentFixture<CategoryAlphabeticalComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let filterServiceSpy: jasmine.SpyObj<CategoryFilterService>;

  const mockCategories: ICategory[] = [
    {
      id: 1,
      wording: 'Banana',
      description: null,
      group: { id: 1, name: 'Fruits', color: 'yellow' },
    },
    {
      id: 2,
      wording: 'Apple',
      description: null,
      group: { id: 1, name: 'Fruits', color: 'yellow' },
    },
  ];

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
    expect(items.length).toBe(2);
  });

  it('should not show no-category message if categories exist', () => {
    const noCategory = fixture.nativeElement.querySelector('.no-category');
    expect(noCategory).toBeNull();
  });
});
