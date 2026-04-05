import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deletecandidate } from './deletecandidate';

describe('Deletecandidate', () => {
  let component: Deletecandidate;
  let fixture: ComponentFixture<Deletecandidate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deletecandidate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deletecandidate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
