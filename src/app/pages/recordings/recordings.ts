import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sessionservice } from '../../core/services/sessionservice';
import { CommonModule } from '@angular/common';
import { faArrowRight, faCalendarDay, faClock, faEdit, faPlayCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatDialog } from '@angular/material/dialog';
// import { Videoframe } from '../videoframe/videoframe';
import { IBatchSession } from '../../core/models/BatchSession';
import { Auth } from '../../core/services/auth';
import { Authuser } from '../../core/services/authuser';
import { Addeditsession } from '../addeditsession/addeditsession';
import { Deletesession } from '../deletesession/deletesession';

@Component({
  selector: 'app-recordings',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './recordings.html',
  styleUrl: './recordings.css',
})
export class Recordings implements OnInit {

  activeRoute = inject(ActivatedRoute)
  sessionService = inject(Sessionservice);
  authUser = inject(Authuser);
  batchId = this.activeRoute.snapshot.params['batchId'];
  faArrowRight = faArrowRight;
  faPlayCircle = faPlayCircle;
  faCalendarDay= faCalendarDay;
  faClock= faClock;
  faEdit = faEdit;
  faTrash = faTrash;


  constructor(public dialog: MatDialog) { }
  batch: any;
  ngOnInit() {
    const navigation = history.state;
    this.batch = navigation?.batch;
    this.sessionService.getSessionsByBatch(this.batchId);
  }
  getYoutubeThumbnail(url: string): string {
    const regExp =
      /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
  }

  viewVideo(session?: IBatchSession): void {
    // this.dialog.open(Videoframe, {
    //   data: session,
    //   width: '60vw',
    //   height: '90vh',
    //   maxWidth: '60vw',
    //   maxHeight: '90vh'
    // });
  }

  addEditSession(session: IBatchSession) {
      console.log('Editing session:', session);
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

    deleteSession(item: IBatchSession) {
      const dialogRef = this.dialog.open(Deletesession, {
        data: item ? item : undefined,
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
