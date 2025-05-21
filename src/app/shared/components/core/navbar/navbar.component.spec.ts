import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RoutesEnum } from '../../../../routes/routes.enum';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, NavItemComponent],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have routesEnum property', () => {
    expect(component.routesEnum).toBeDefined();
    expect(component.routesEnum).toBe(RoutesEnum);
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h4')?.textContent).toContain('Catégories');
  });

  it('should render two nav items with correct labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navItems = compiled.querySelectorAll('app-nav-item');
    expect(navItems.length).toBe(2);
    expect(navItems[0].textContent).toContain('Groupe de catégorie');
    expect(navItems[1].textContent).toContain('Ordre alphabétique');
  });

  it('should render nav items with correct router links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navItems = compiled.querySelectorAll('app-nav-item');
    expect(navItems[0].getAttribute('ng-reflect-router-link')).toBe(RoutesEnum.CATEGORY_GROUP);
    expect(navItems[1].getAttribute('ng-reflect-router-link')).toBe(
      RoutesEnum.CATEGORY_ALPHABETICAL,
    );
  });

  it('should render images in nav items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');
    expect(images.length).toBe(2);
    expect(images[0].getAttribute('src')).toBe('/stacks.svg');
    expect(images[1].getAttribute('src')).toBe('/sort-alpha.svg');
  });
});
