import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBatchEnrollment } from './delete-batch-enrollment';

describe('DeleteBatchEnrollment', () => {
  let component: DeleteBatchEnrollment;
  let fixture: ComponentFixture<DeleteBatchEnrollment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBatchEnrollment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBatchEnrollment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
