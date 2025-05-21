import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ICategory, IGroup } from '../../shared/interfaces/category.interface';
import { CategoryFilterService } from '../../shared/services/category-filter.service';
import { CategoryService } from '../../shared/services/category.service';
import { CategoryLayoutComponent } from './category-layout.component';

describe('CategoryLayoutComponent', () => {
  let component: CategoryLayoutComponent;
  let fixture: ComponentFixture<CategoryLayoutComponent>;
  let filterServiceSpy: jasmine.SpyObj<CategoryFilterService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;

  beforeEach(async () => {
    filterServiceSpy = jasmine.createSpyObj('CategoryFilterService', [
      'setSearchText',
      'setSelectedGroup',
    ]);

    const mockGroup: IGroup = { id: 1, name: 'Group 1', color: 'red' };
    const mockCategories: ICategory[] = [
      { id: 1, wording: 'Cat 1', description: null, group: mockGroup },
      { id: 2, wording: 'Cat 2', description: null, group: mockGroup },
    ];
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', [], {
      categoryMixed: signal(mockCategories),
    });

    await TestBed.configureTestingModule({
      imports: [CategoryLayoutComponent, RouterTestingModule],
      providers: [
        { provide: CategoryFilterService, useValue: filterServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input and select', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[type="text"]')).toBeTruthy();
    expect(compiled.querySelector('select')).toBeTruthy();
  });

  it('should call setSearchText on input', () => {
    const input = fixture.nativeElement.querySelector('input[type="text"]') as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(filterServiceSpy.setSearchText).toHaveBeenCalledWith('test');
  });

  it('should call setSelectedGroup on select change', () => {
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(filterServiceSpy.setSelectedGroup).toHaveBeenCalledWith(select.value);
  });

  it('should render options from categoryOptions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const options = compiled.querySelectorAll('select option');
    expect(options.length).toBeGreaterThan(1);
    expect(options[1].textContent).toContain('Group 1');
  });

  it('should compute categoryOptions correctly', () => {
    const options = component.categoryOptions();
    expect(options.length).toBe(1);
    expect(options[0].label).toBe('Group 1');
    expect(options[0].value).toBe(1);
  });
});
