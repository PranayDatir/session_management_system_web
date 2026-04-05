import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Videoframe } from './videoframe';

describe('Videoframe', () => {
  let component: Videoframe;
  let fixture: ComponentFixture<Videoframe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Videoframe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Videoframe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
