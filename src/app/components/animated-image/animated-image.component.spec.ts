import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedImageComponent } from './animated-image.component';

describe('AnimatedImageComponent', () => {
  let component: AnimatedImageComponent;
  let fixture: ComponentFixture<AnimatedImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
