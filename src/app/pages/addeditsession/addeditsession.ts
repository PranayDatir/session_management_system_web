import { Component, Inject, inject, OnInit, Optional } from '@angular/core';
import { faCalendarAlt, faLayerGroup, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BatchService } from '../../core/services/batches';
import { IBatchSession } from '../../core/models/BatchSession';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Addeditcandidate } from '../addeditcandidate/addeditcandidate';
import { Sessionservice } from '../../core/services/sessionservice';
import { formatDate } from '../../shared/utils/utilityFunctions';

@Component({
  selector: 'app-addeditsession',
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './addeditsession.html',
  styleUrl: './addeditsession.css',
})
export class Addeditsession implements OnInit {
  ngOnInit() {
    this.batchService.getBatches();
  }

  faPlus = faPlus;
  faLayerGroup = faLayerGroup;
  faCalendarAlt = faCalendarAlt;
  faTimes = faTimes;

  fb = inject(FormBuilder);
  sessionForm : FormGroup;
  batchService = inject(BatchService);
  sessionService = inject(Sessionservice);

  isEdit: boolean = false;

  constructor(@Optional() public dialogRef: MatDialogRef<Addeditsession>, @Inject(MAT_DIALOG_DATA) public dialogData: IBatchSession) {
    this.sessionForm = this.fb.group({
    _id: undefined,
    batchId: [0],
    topicName: (''),
    topicDescription: [''],
    youtubeVideoId: [''],
    durationInMinutes: [0],
    sessionDate: [''],
    displayOrder: [0],
    createdAt: [new Date()],
    updatedAt: [new Date()]
  });
    if (this.dialogData && this.dialogData._id !== undefined) {
      this.isEdit = true;

      console.log('Dialog Data received for edit:', this.dialogData);

      this.sessionService.getSessionById(this.dialogData._id, (data: IBatchSession) => {
        console.log('Session Data fetched for edit:', data);
        this.sessionForm.patchValue({
          ...data,
          sessionDate: data.sessionDate ? formatDate(data.sessionDate) : ''
        });
      });
    }
  }

  submitForm() {
    const body = this.sessionForm.value;
    if(!this.isEdit) {
        delete body._id;
    }
    this.sessionService.addEditSession(body, () => {
      this.dialogRef.close();
    });
  }

}
