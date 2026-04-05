import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deletebatchconfirmation } from './deletebatchconfirmation';

describe('Deletebatchconfirmation', () => {
  let component: Deletebatchconfirmation;
  let fixture: ComponentFixture<Deletebatchconfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deletebatchconfirmation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deletebatchconfirmation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
