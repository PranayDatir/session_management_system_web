import { inject, Injectable, signal } from '@angular/core';
import { ApiRoutes } from '../constants/ApiRoutes';
import { IApiResponse } from '../Interfaces/ApiResponse';
import { IUser } from '../models/Candidate';
import { Http } from './http';
import { IBatchSession } from '../models/BatchSession';
import { BehaviorSubject } from 'rxjs';
import { Notify } from './notify';

@Injectable({
  providedIn: 'root',
})
export class Sessionservice {

  http = inject(Http);
  notify = inject(Notify)
  sessionsList = signal<IBatchSession[]>([]);
  allSessionsListByBatch = signal<IBatchSession[]>([]);
  sessionsListByBatch = signal<IBatchSession[]>([]);

  getSessions() {
    const http = this.http.get<IApiResponse<IBatchSession[]>>(ApiRoutes.GET_ALL_SESSIONS_RECORDINGS).subscribe({
      next: (res: IApiResponse<IBatchSession[]>) => {
        if (res.result) {
          this.sessionsList.set(res.data!);
          this.notify.show('success', res.message);
        } else {
          this.notify.show('info', res.message);
        }
      },
      error: (err) => {
        console.log(err);this.notify.show('error', 'Internal Server Error');
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  getSessionById(sessionId: string, cb: (data: IBatchSession) => void) {
    this.http.get<IApiResponse<IBatchSession>>(ApiRoutes.GET_SESSION_BY_ID, sessionId).subscribe({
      next: (res: IApiResponse<IBatchSession>) => {
        if (res.result) {
          cb(res.data!);
          this.notify.show('success', res.message);
        } else {
          this.notify.show('info', res.message);
        }
      },
      error: (err) => {
        console.log(err);this.notify.show('error', 'Internal Server Error');
      },
      complete: () => {
        console.log('complete');
      },
    })
  }

  getSessionsByBatch(batchId: string) {
    console.log('complete batchId ---> ', batchId);
    this.http.get<IApiResponse<IBatchSession[]>>(ApiRoutes.GET_ALL_SESSIONS_RECORDINGS_BY_BATCH, batchId).subscribe({
      next: (res: IApiResponse<IBatchSession[]>) => {
        if (res.result) {
          this.sessionsListByBatch.set(res.data!);
          this.allSessionsListByBatch.set(res.data!);
          this.notify.show('success', res.message);
        } else {
          this.notify.show('info', res.message);
        }
      },
      error: (err) => {
        console.log(err);
        this.notify.show('error', 'Internal Server Error');
      },
      complete: () => {
        console.log('complete');
      },
    })
  }

  addEditSession(session: IBatchSession, callback: () => void) {
    if (session._id === undefined) {
      this.http.post<IApiResponse<IBatchSession>>(ApiRoutes.BATCHSESSIONS, session).subscribe({
        next: (res: IApiResponse<IBatchSession>) => {
          if (res.result) {
            callback();
            this.notify.show('success', res.message);
          } else {
            this.notify.show('info', res.message);
          }
        },
        error: (err) => {
          console.log(err);
          this.notify.show('error', 'Internal Server Error');
        },
        complete: () => {
          console.log('complete');
        }
      });
    } else {
      this.http.put<IApiResponse<IBatchSession>>(ApiRoutes.BATCHSESSIONS, session, session._id).subscribe({
        next: (res: IApiResponse<IBatchSession>) => {
          if (res.result) {
            callback();
            this.notify.show('success', res.message);
          } else {
            this.notify.show('info', res.message);
          }
        },
        error: (err) => {
          console.log(err);
          this.notify.show('error', 'Internal Server Error');
        },
        complete: () => {
          console.log('complete');
        }
      });
    }
  }

  deleteSessionByID(sessionId: string, callback?: () => void) {
    this.http.delete<IApiResponse<IBatchSession>>(ApiRoutes.BATCHSESSIONS, sessionId).subscribe({
      next: (res: IApiResponse<IBatchSession>) => {
        if (res.result == true) {
          callback?.();
          this.notify.show('success', res.message);
        } else {
          this.notify.show('info', res.message);
        }
      },
      error: (err) => {
        console.log(err);
        this.notify.show('error', 'Internal Server Error');
      },
      complete: () => {
        console.log('complete');
      },
    })
  }

  private searchTermSubject = new BehaviorSubject<string>('');

  searchTerm$ = this.searchTermSubject.asObservable();

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }
}
