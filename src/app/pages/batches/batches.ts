import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BatchService } from '../../core/services/batches';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrashAlt, faPlus, faEye, faHashtag, faAlignLeft, faCalendar, faCog, faTag, faToggleOn, faCalendarAlt, faLayerGroup, faSearch, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { DatePipe, NgClass } from '@angular/common';
import { IBatch } from '../../core/models/Batch';
import { StatusPipe } from "../../shared/pipe/status-pipe";
import { Addeditbatch } from '../addeditbatch/addeditbatch';
import { Deletebatchconfirmation } from '../deletebatchconfirmation/deletebatchconfirmation';
import { Router } from '@angular/router';
import { PaginationComponent } from "../../shared/components/pagination/pagination";

@Component({
  selector: 'app-batches',
  imports: [FontAwesomeModule, DatePipe, StatusPipe, NgClass, MatDialogModule, PaginationComponent],
  templateUrl: './batches.html',
  styleUrl: './batches.css',
})
export class Batches implements OnInit {
  faEdit = faEdit;
  faTrash = faTrashAlt;
  faPlus = faPlus;
  faEye = faEye;
  faHashtag = faHashtag;
  faTag = faTag;
  faAlignLeft = faAlignLeft;
  faCalendar = faCalendar;
  faToggleOn = faToggleOn;
  faCog = faCog;
  faCalendarAlt = faCalendarAlt;
  faLayerGroup = faLayerGroup;
  faSearch = faSearch;
  faTimesCircle = faTimesCircle;
  faCheckCircle = faCheckCircle;

  batcheService = inject(BatchService);
  router = inject(Router);

  ngOnInit() {
    this.batcheService.getBatches()
  }

  constructor(private dialog: MatDialog) {

  }

  batch: IBatch = {
    _id: undefined,
    batchName: '',
    startDate: '',
    endDate: '',
    isActive: false,
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  addEditBatch(batch: IBatch | undefined) {
    console.log(batch);
    const dialogRef = this.dialog.open(Addeditbatch, {
      data: batch ? batch : undefined,
      width: '80%',
      minHeight: '80%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      result ? this.batcheService.getBatches() : null;
    });
  }

  deleteBatch(batch: IBatch) {
    const dialogRef = this.dialog.open(Deletebatchconfirmation, {
      data: batch,
      width: '80%',
      minHeight: '80%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      result ? this.batcheService.getBatches() : null;
    });
  }

  viewSessions(batch: IBatch) {
    this.router.navigate(['layout/batchSessions/recording', batch._id]);
  }

  currentPage = signal(1);
  pageSize = signal(5);

  paginatedBatches = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.batcheService.batchData().slice(startIndex, endIndex);
  });

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onFilterChange(event: any) {
    this.batcheService.filterBatches(event);
    this.currentPage.set(1);
  }
}
