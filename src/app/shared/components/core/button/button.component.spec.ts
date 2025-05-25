import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.text).toBe('');
    expect(component.selected).toBeFalse();
    expect(component.disabled).toBeFalse();
    expect(component.icon).toBeUndefined();
  });

  it('should display text when provided', () => {
    const testText = 'Test Button';
    component.text = testText;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.app-button__text').textContent).toContain(testText);
  });

  it('should display icon when provided', () => {
    const testIcon = 'test-icon';
    component.icon = testIcon;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const iconElement = compiled.querySelector('.app-button__icon');
    expect(iconElement).toBeTruthy();
    expect(iconElement.classList).toContain(testIcon);
  });

  it('should not display icon when not provided', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.app-button__icon')).toBeFalsy();
  });

  it('should add selected class when selected is true', () => {
    component.selected = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.app-button').classList).toContain('selected');
  });

  it('should add disabled class and attribute when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.app-button');
    expect(button.classList).toContain('disabled');
    expect(button.disabled).toBeTrue();
  });

  it('should emit clicked event when clicked and not disabled', () => {
    const clickedSpy = spyOn(component.clicked, 'emit');

    const button = fixture.nativeElement.querySelector('.app-button');
    button.click();
    fixture.detectChanges();

    expect(clickedSpy).toHaveBeenCalled();
  });

  it('should not emit clicked event when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const clickedSpy = spyOn(component.clicked, 'emit');

    const button = fixture.nativeElement.querySelector('.app-button');
    button.click();
    fixture.detectChanges();

    expect(clickedSpy).not.toHaveBeenCalled();
  });
});
