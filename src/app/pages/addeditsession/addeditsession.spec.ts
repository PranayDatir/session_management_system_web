import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addeditsession } from './addeditsession';

describe('Addeditsession', () => {
  let component: Addeditsession;
  let fixture: ComponentFixture<Addeditsession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addeditsession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addeditsession);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
