/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ICategory } from '../../interfaces/category.interface';
import { mockCategories } from '../../mocks/category.mock';
import { TagsComponent } from '../tags/tags.component';
import { CategoryItemComponent } from './category-item.component';

describe('CategoryItemComponent', () => {
  let component: CategoryItemComponent;
  let fixture: ComponentFixture<CategoryItemComponent>;

  const mockCategory: ICategory = mockCategories[0]; // Using Cat Z from mock data

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryItemComponent, TagsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('category', mockCategory);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.selected).toBeFalse();
    expect(component.seeTags()).toBeTrue();
  });

  it('should toggle selection when toggleSelection is called', () => {
    const selectedSpy = spyOn(component.selectedSignal, 'emit');

    component.toggleSelection();
    expect(component.selected).toBeTrue();
    expect(selectedSpy).toHaveBeenCalledWith(true);

    component.toggleSelection();
    expect(component.selected).toBeFalse();
    expect(selectedSpy).toHaveBeenCalledWith(false);
  });

  it('should display category information correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h6').textContent).toContain(mockCategory.wording);
    expect(compiled.querySelector('p').textContent).toBe(''); // Description is null in mock
  });

  it('should handle null category input', () => {
    fixture.componentRef.setInput('category', null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h6').textContent).toBe('');
    expect(compiled.querySelector('p').textContent).toBe('');
  });

  it('should toggle selected class when clicked', () => {
    const element = fixture.nativeElement.querySelector('.category-item');
    expect(element.classList.contains('selected')).toBeFalse();

    element.click();
    fixture.detectChanges();
    expect(element.classList.contains('selected')).toBeTrue();

    element.click();
    fixture.detectChanges();
    expect(element.classList.contains('selected')).toBeFalse();
  });

  it('should have correct ARIA attributes', () => {
    const element = fixture.nativeElement.querySelector('.category-item');
    expect(element.getAttribute('role')).toBe('button');
    expect(element.getAttribute('aria-selected')).toBe('false');

    element.click();
    fixture.detectChanges();
    expect(element.getAttribute('aria-selected')).toBe('true');
  });

  it('should handle category without group', () => {
    const categoryWithoutGroup = mockCategories[4]; // Using "No Group" category
    fixture.componentRef.setInput('category', categoryWithoutGroup);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h6').textContent).toContain(categoryWithoutGroup.wording);
    expect(compiled.querySelector('p').textContent).toBe('');
  });
});
