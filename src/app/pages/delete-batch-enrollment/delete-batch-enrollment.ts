import { Component, inject, Inject, Optional } from '@angular/core';
import { BatchEnrollmentService } from '../../core/services/batch-enrollment-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IBatchEnrollment } from '../../core/models/BatchEnrollment';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-delete-batch-enrollment',
  imports: [FontAwesomeModule],
  templateUrl: './delete-batch-enrollment.html',
  styleUrl: './delete-batch-enrollment.css',
})
export class DeleteBatchEnrollment {
batchEnrollService = inject(BatchEnrollmentService);
  object: IBatchEnrollment;

  constructor(@Optional() public dialogRef: MatDialogRef<DeleteBatchEnrollment>, @Inject(MAT_DIALOG_DATA) data: IBatchEnrollment) {
    this.object = data;
  }

  faTrashAlt = faTrashAlt;
  faTimes = faTimes;

  deleteBatch(batchId: string) {
    this.batchEnrollService.deleteBatchByID(batchId, () => this.dialogRef.close(true));
  }
}
