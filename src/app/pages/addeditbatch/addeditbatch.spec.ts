import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addeditbatch } from './addeditbatch';

describe('Addeditbatch', () => {
  let component: Addeditbatch;
  let fixture: ComponentFixture<Addeditbatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addeditbatch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addeditbatch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
