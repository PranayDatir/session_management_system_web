import { Component, inject, Inject, Optional } from '@angular/core';
import { IBatch } from '../../core/models/Batch';
import { IBatchSession } from '../../core/models/BatchSession';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../../core/models/Candidate';
import { CandidateService } from '../../core/services/candidate-service';
import { Deletecandidate } from '../deletecandidate/deletecandidate';
import { Sessionservice } from '../../core/services/sessionservice';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-deletesession',
  imports: [FontAwesomeModule],
  templateUrl: './deletesession.html',
  styleUrl: './deletesession.css',
})
export class Deletesession {
object: IBatchSession;
  faTrashAlt = faTrashAlt;
  faTimes = faTimes;

 sessionService = inject(Sessionservice);

  constructor(@Optional() public dialogRef: MatDialogRef<Deletesession>, @Inject(MAT_DIALOG_DATA) data: IBatchSession) {
    this.object = data;
  }

  deleteSession(id: string) {
    this.sessionService.deleteSessionByID(id, () => {
      this.dialogRef.close(true);
    });
  }
}
