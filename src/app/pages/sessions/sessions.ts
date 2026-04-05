import { Component, inject } from '@angular/core';
import { Sessionservice } from '../../core/services/sessionservice';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faEdit, faTrashAlt, faPlus, faEye, faHashtag, faTag, faAlignLeft, faCalendar, faToggleOn, faCog, faCalendarAlt, faLayerGroup, faSearch, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { IBatchSession } from '../../core/models/BatchSession';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Addeditsession } from '../addeditsession/addeditsession';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BatchService } from '../../core/services/batches';
import { Authuser } from '../../core/services/authuser';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sessions',
  imports: [FontAwesomeModule, MatDialogModule,  RouterOutlet, ReactiveFormsModule],
  templateUrl: './sessions.html',
  styleUrl: './sessions.css',
})
export class Sessions {
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
  sessionService = inject(Sessionservice);
  batchService = inject(BatchService);
  activeRoute = inject(ActivatedRoute);
  
  constructor(public dialog: MatDialog) { }
  
  batchId = this.activeRoute.snapshot.params['batchId'];
  route = this.activeRoute.snapshot.routeConfig;
  authUser = inject(Authuser);
  searchControl = new FormControl('');
  private destroySearch$ = new Subject<void>();
  searchTerm$ = new BehaviorSubject<string>('');
  ngOnInit() {
   this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroySearch$)
      )
      .subscribe((searchTerm) => {
        this.sessionService.setSearchTerm(searchTerm ?? '');
      });
  } 

  addEditSession(session?: IBatchSession) {
    const dialogRef = this.dialog.open(Addeditsession, {
      data: session ? session : undefined,
      width: '60%',
      minHeight: '60%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      result ? this.sessionService.getSessions() : null;
    });

  }


}
