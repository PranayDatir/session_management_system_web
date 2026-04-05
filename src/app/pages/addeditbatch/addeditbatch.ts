import { Component, Inject, inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTimes, faPlusCircle, faTag, faAlignLeft, faCalendarAlt, faCalendarCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { IBatch } from '../../core/models/Batch';
import { BatchService } from '../../core/services/batches';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../shared/utils/utilityFunctions';

@Component({
  selector: 'app-addeditbatch',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './addeditbatch.html',
  styleUrl: './addeditbatch.css',
})
export class Addeditbatch implements OnInit {
  fb = inject(FormBuilder);
  batchService = inject(BatchService);

  constructor(@Optional() public dialogRef: MatDialogRef<Addeditbatch>, @Inject(MAT_DIALOG_DATA) public dialogData: IBatch) { }

  faTimes = faTimes
  faPlusCircle = faPlusCircle
  faTag = faTag
  faAlignLeft = faAlignLeft
  faCalendarAlt = faCalendarAlt
  faCalendarCheck = faCalendarCheck
  faCheckCircle = faCheckCircle
  faPlus = faPlus

  batchForm = this.fb.group({
    _id: undefined,
    batchName: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    isActive: [false],
    description: ['', [Validators.required]],
    createdAt: [new Date()],
    updatedAt: [new Date()],
  });

  isEdit: boolean = false;
  ngOnInit(): void {
    if (this.dialogData && this.dialogData._id != undefined) {
      this.isEdit = true;

      this.batchService.getBatchById(this.dialogData._id!, (data: IBatch) => {
      this.batchForm.patchValue({
        ...data,
        startDate: formatDate(data.startDate),
        endDate: formatDate(data.endDate)
      })
    });
    }
  }

  

  submitForm() {
    const payload = this.batchForm.value as IBatch;
     if (!this.isEdit) {
      delete payload._id; // ✅ ensure no _id on create
    }
    if (this.batchForm.valid) {
      this.batchService.addEditBatch(payload, () => this.dialogRef?.close(true));
    }
  }
}
