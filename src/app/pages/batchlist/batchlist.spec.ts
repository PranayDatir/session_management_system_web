import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Batchlist } from './batchlist';

describe('Batchlist', () => {
  let component: Batchlist;
  let fixture: ComponentFixture<Batchlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Batchlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Batchlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
