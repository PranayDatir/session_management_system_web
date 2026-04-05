import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faSearch, faPlus, faHashtag, faTag, faCalendar, faToggleOn, faCog, faCalendarAlt, faEye, faEdit, faTrash, faCheckCircle, faTimesCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { IBatchEnrollment } from '../../core/models/BatchEnrollment';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBatchEnrollment } from '../add-edit-batch-enrollment/add-edit-batch-enrollment';
import { BatchEnrollmentService } from '../../core/services/batch-enrollment-service';
import { StatusPipe } from "../../shared/pipe/status-pipe";
import { CommonModule } from '@angular/common';
import { DeleteBatchEnrollment } from '../delete-batch-enrollment/delete-batch-enrollment';

@Component({
  selector: 'app-batch-enrollments',
  imports: [FontAwesomeModule, StatusPipe, CommonModule],
  templateUrl: './batch-enrollments.html',
  styleUrl: './batch-enrollments.css',
})
export class BatchEnrollments implements OnInit {
  faSearch = faSearch;
  faPlus = faPlus;
  faHashtag = faHashtag;
  faTag = faTag;
  faCalendar = faCalendar;
  faToggleOn = faToggleOn;
  faCog = faCog;
  faCalendarAlt = faCalendarAlt;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  faCheckCircle = faCheckCircle;
  faTimesCircle =faTimesCircle;
  faUser = faUser;

  enrollService = inject(BatchEnrollmentService);

  constructor(public dialog: MatDialog) { }
  ngOnInit() {
    this.enrollService.getEnrollments();
  }

  addEditEnrollment(enrollmentId?: string) {

    const dialogRef = this.dialog.open(AddEditBatchEnrollment, {
      data: enrollmentId ? enrollmentId : undefined,
      width: '60%',
      minHeight: '60%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });

    dialogRef.afterClosed().subscribe((result) => {
      result ? this.enrollService.getEnrollments() : null;
    });
    
  }

  deleteEnrollment(enrollment: IBatchEnrollment) {
    
    const dialogRef = this.dialog.open(DeleteBatchEnrollment, {
          data: enrollment,
          width: '80%',
          minHeight: '80%',
          enterAnimationDuration: '100ms',
          exitAnimationDuration: '100ms'
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          result ? this.enrollService.getEnrollments() : null;
        });
  }
}
