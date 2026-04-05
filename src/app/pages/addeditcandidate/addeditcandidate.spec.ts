import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addeditcandidate } from './addeditcandidate';

describe('Addeditcandidate', () => {
  let component: Addeditcandidate;
  let fixture: ComponentFixture<Addeditcandidate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addeditcandidate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addeditcandidate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
