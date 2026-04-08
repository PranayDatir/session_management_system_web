import { inject, Injectable, signal } from '@angular/core';
import { Http } from './http';
import { IApiResponse } from '../Interfaces/ApiResponse';
import { IUser } from '../models/Candidate';
import { ApiRoutes } from '../constants/ApiRoutes';
import { Notify } from './notify';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  http = inject(Http);
  notify = inject(Notify);
  candidatesList = signal<IUser[]>([]);
  allCandidatesList = signal<IUser[]>([]);

  getCandidates() {
    const http = this.http.get<IApiResponse<IUser[]>>(ApiRoutes.CANDIDATES).subscribe({
      next: (res: IApiResponse<IUser[]>) => {
        if (res.result) {
          this.candidatesList.set(res.data!);
          this.allCandidatesList.set(res.data!);
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

  getCandidateById(candidateId: string, cb: (data: IUser) => void) {
    this.http.get<IApiResponse<IUser>>(ApiRoutes.CANDIDATES, candidateId).subscribe({
      next: (res: IApiResponse<IUser>) => {
        if (res.result) {
          cb(res.data!);
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

  addEditCandidate(candidate: IUser, callback: () => void) {
    if (candidate._id === undefined) {
      this.http.post<IApiResponse<IUser>>(ApiRoutes.CANDIDATES, candidate).subscribe({
        next: (res: IApiResponse<IUser>) => {
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
      this.http.put<IApiResponse<IUser>>(ApiRoutes.CANDIDATES, candidate, candidate._id).subscribe({
        next: (res: IApiResponse<IUser>) => {
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

  deleteCandidateByID(candidateId: string, callback?: () => void) {
    this.http.delete<IApiResponse<IUser>>(ApiRoutes.CANDIDATES, candidateId).subscribe({
      next: (res: IApiResponse<IUser>) => {
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

}