import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagColorDirective } from '../../directives/tag-color.directive';
import { mockGroup1, mockGroup2 } from '../../mocks/category.mock';
import { TagsComponent } from './tags.component';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsComponent, TagColorDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display group name when group is provided', () => {
    fixture.componentRef.setInput('group', mockGroup1);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.tag span').textContent).toContain(mockGroup1.name);
  });

  it('should apply correct color when group is provided', () => {
    fixture.componentRef.setInput('group', mockGroup1);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const tagElement = compiled.querySelector('.tag');
    expect(tagElement.getAttribute('ng-reflect-color')).toBe(mockGroup1.color);
  });

  it('should use default yellow color when group is null', () => {
    fixture.componentRef.setInput('group', null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const tagElement = compiled.querySelector('.tag');
    expect(tagElement.getAttribute('ng-reflect-color')).toBe('app-yellow');
  });

  it('should update display when group changes', () => {
    // Initial group
    fixture.componentRef.setInput('group', mockGroup1);
    fixture.detectChanges();

    let compiled = fixture.nativeElement;
    expect(compiled.querySelector('.tag span').textContent).toContain(mockGroup1.name);
    expect(compiled.querySelector('.tag').getAttribute('ng-reflect-color')).toBe(mockGroup1.color);

    // Change group
    fixture.componentRef.setInput('group', mockGroup2);
    fixture.detectChanges();

    compiled = fixture.nativeElement;
    expect(compiled.querySelector('.tag span').textContent).toContain(mockGroup2.name);
    expect(compiled.querySelector('.tag').getAttribute('ng-reflect-color')).toBe(mockGroup2.color);
  });

  it('should have correct CSS classes', () => {
    fixture.componentRef.setInput('group', mockGroup1);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const tagElement = compiled.querySelector('.tag');
    expect(tagElement).toBeTruthy();
    expect(tagElement.classList.contains('tag')).toBeTrue();
  });
});
