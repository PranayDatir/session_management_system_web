import { Component, Inject, inject, Optional } from '@angular/core';
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BatchService } from '../../core/services/batches';
import { IBatch } from '../../core/models/Batch';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-deletebatchconfirmation',
    imports: [FontAwesomeModule],
    templateUrl: './deletebatchconfirmation.html',
    styleUrl: './deletebatchconfirmation.css',
})
export class Deletebatchconfirmation {

    batchService = inject(BatchService);
    object: IBatch;

    constructor(@Optional() public dialogRef: MatDialogRef<Deletebatchconfirmation>, @Inject(MAT_DIALOG_DATA) data: IBatch) {
        this.object = data;
    }

    faTrashAlt = faTrashAlt;
    faTimes = faTimes;

    deleteBatch(batchId: string) {
        this.batchService.deleteBatchByID(batchId, () => this.dialogRef.close(true));
    }


}
