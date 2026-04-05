import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBatchEnrollment } from './add-edit-batch-enrollment';

describe('AddEditBatchEnrollment', () => {
  let component: AddEditBatchEnrollment;
  let fixture: ComponentFixture<AddEditBatchEnrollment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBatchEnrollment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBatchEnrollment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
