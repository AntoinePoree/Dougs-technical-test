import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavItemComponent } from './nav-item.component';

describe('NavItemComponent', () => {
  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavItemComponent],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have label input', () => {
    expect(component.label).toBeDefined();
  });

  it('should have routerLink input', () => {
    expect(component.routerLink).toBeDefined();
  });

  it('should render label when provided', () => {
    const testLabel = 'Test Label';
    fixture.componentRef.setInput('label', testLabel);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(testLabel);
  });

  it('should have routerLink attribute when provided', () => {
    const testRoute = '/test-route';
    fixture.componentRef.setInput('routerLink', testRoute);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('button');
    expect(link?.getAttribute('ng-reflect-router-link')).toBe(testRoute);
  });
});
