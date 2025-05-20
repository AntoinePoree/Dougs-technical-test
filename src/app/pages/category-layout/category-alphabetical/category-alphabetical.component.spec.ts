import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAlphabeticalComponent } from './category-alphabetical.component';

describe('CategoryAlphabeticalComponent', () => {
  let component: CategoryAlphabeticalComponent;
  let fixture: ComponentFixture<CategoryAlphabeticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryAlphabeticalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAlphabeticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
