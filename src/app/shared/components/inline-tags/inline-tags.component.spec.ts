import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineTagsComponent } from './inline-tags.component';

describe('InlineTagsComponent', () => {
  let component: InlineTagsComponent;
  let fixture: ComponentFixture<InlineTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
