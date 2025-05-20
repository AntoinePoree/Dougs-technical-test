import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display two nav items with correct labels', () => {
    const navItems = fixture.debugElement.queryAll(By.css('app-nav-item'));
    expect(navItems.length).toBe(2);
    expect(navItems[0].nativeElement.textContent).toContain('Groupe de catégorie');
    expect(navItems[1].nativeElement.textContent).toContain('Ordre alphabétique');
  });

  it('should display the correct icons', () => {
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBe(2);
    expect(images[0].nativeElement.getAttribute('src')).toContain('stacks.svg');
    expect(images[1].nativeElement.getAttribute('src')).toContain('sort-alpha.svg');
  });

  // Si tu utilises routerLink, tu peux tester leur présence :
  it('should have routerLink attributes on nav items', () => {
    const navItems = fixture.debugElement.queryAll(By.css('app-nav-item'));
    expect(navItems[0].attributes['ng-reflect-router-link']).toBeDefined();
    expect(navItems[1].attributes['ng-reflect-router-link']).toBeDefined();
  });
});
