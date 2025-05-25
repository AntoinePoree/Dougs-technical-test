import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagColorDirective } from './tag-color.directive';

// Test component to host the directive
@Component({
  template: '<div appTagColor [color]="color"></div>',
  standalone: true,
  imports: [TagColorDirective],
})
class TestComponent {
  color = '';
}

describe('TagColorDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply default yellow color when no color is provided', () => {
    fixture.detectChanges();
    expect(element.style.backgroundColor).toBe('var(--app-yellow-100)');
    expect(element.style.color).toBe('var(--app-yellow-600)');
  });

  it('should apply yellow color when green is provided', () => {
    component.color = 'm-green';
    fixture.detectChanges();
    expect(element.style.backgroundColor).toBe('var(--app-yellow-100)');
    expect(element.style.color).toBe('var(--app-yellow-600)');
  });

  it('should apply blue color when purple is provided', () => {
    component.color = 'm-purple';
    fixture.detectChanges();
    expect(element.style.backgroundColor).toBe('var(--app-blue-100)');
    expect(element.style.color).toBe('var(--app-blue-600)');
  });

  it('should apply red color when pink is provided', () => {
    component.color = 'm-pink';
    fixture.detectChanges();
    expect(element.style.backgroundColor).toBe('var(--app-red-100)');
    expect(element.style.color).toBe('var(--app-red-600)');
  });

  it('should replace m- prefix with app- prefix', () => {
    component.color = 'm-blue';
    fixture.detectChanges();
    expect(element.style.backgroundColor).toBe('var(--app-blue-100)');
    expect(element.style.color).toBe('var(--app-blue-600)');
  });

  it('should handle empty color string', () => {
    component.color = '';
    fixture.detectChanges();
    expect(element.style.backgroundColor).toBe('var(--app-yellow-100)');
    expect(element.style.color).toBe('var(--app-yellow-600)');
  });

  it('should handle undefined color', () => {
    component.color = undefined as any;
    fixture.detectChanges();
    expect(element.style.backgroundColor).toBe('var(--app-yellow-100)');
    expect(element.style.color).toBe('var(--app-yellow-600)');
  });

  it('should update styles when color changes', () => {
    // Initial color
    component.color = 'm-blue';
    fixture.detectChanges();
    expect(element.style.backgroundColor).toBe('var(--app-blue-100)');
    expect(element.style.color).toBe('var(--app-blue-600)');

    // Change color
    component.color = 'm-red';
    fixture.detectChanges();
    expect(element.style.backgroundColor).toBe('var(--app-red-100)');
    expect(element.style.color).toBe('var(--app-red-600)');
  });
});
