import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deletesession } from './deletesession';

describe('Deletesession', () => {
  let component: Deletesession;
  let fixture: ComponentFixture<Deletesession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deletesession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deletesession);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
