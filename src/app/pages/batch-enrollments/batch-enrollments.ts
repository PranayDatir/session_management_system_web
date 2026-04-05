import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faSearch, faPlus, faHashtag, faTag, faCalendar, faToggleOn, faCog, faCalendarAlt, faEye, faEdit, faTrash, faCheckCircle, faTimesCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { IBatchEnrollment } from '../../core/models/BatchEnrollment';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBatchEnrollment } from '../add-edit-batch-enrollment/add-edit-batch-enrollment';
import { BatchEnrollmentService } from '../../core/services/batch-enrollment-service';
import { StatusPipe } from "../../shared/pipe/status-pipe";
import { CommonModule } from '@angular/common';
import { DeleteBatchEnrollment } from '../delete-batch-enrollment/delete-batch-enrollment';
import { Search } from '../../core/services/search';
import { PaginationComponent } from "../../shared/components/pagination/pagination";

@Component({
  selector: 'app-batch-enrollments',
  imports: [FontAwesomeModule, StatusPipe, CommonModule, PaginationComponent],
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
  faTimesCircle = faTimesCircle;
  faUser = faUser;

  enrollService = inject(BatchEnrollmentService);
  searchService = inject(Search);

  currentPage = signal(1);
  pageSize = signal(5);

  constructor(public dialog: MatDialog) { }
  ngOnInit() {
    this.enrollService.getEnrollments();
    this.searchService.search$.subscribe(searchTerm => {
      this.applySearch(searchTerm ?? '');
    });
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

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  paginatedBatchEnroll = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.enrollService.enrollmentList().slice(startIndex, endIndex);
  });

  applySearch(searchTerm: string) {
    const allBatcheEnroll = this.enrollService.allEnrollmentList();

    if (!searchTerm.trim()) {
      this.enrollService.enrollmentList.set(allBatcheEnroll);
      return;
    }

    const filtered = allBatcheEnroll.filter(batchEnroll =>
      batchEnroll.batchId.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batchEnroll.candidateId.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.enrollService.enrollmentList.set(filtered);
    this.currentPage.set(1);
  }
  
}
