import { inject, Injectable, signal } from '@angular/core';
import { Http } from './http';
import { IBatchEnrollment } from '../models/BatchEnrollment';
import { ApiRoutes } from '../constants/ApiRoutes';
import { IApiResponse } from '../Interfaces/ApiResponse';
import { Notify } from './notify';

@Injectable({
  providedIn: 'root',
})
export class BatchEnrollmentService {

  http = inject(Http);
  notify = inject(Notify);

  addEditEnrollForm(enrollform: IBatchEnrollment, callback: () => void) {
      if(enrollform._id !== undefined) {
        this.http.post<IApiResponse<IBatchEnrollment>>(ApiRoutes.BATCH_ENROLLMENTS, enrollform).subscribe({
        next: (res: IApiResponse<IBatchEnrollment>) => {
          if (res.result) {
            callback();
          }
           this.notify.show('success', res.message);
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
        this.http.put<IApiResponse<IBatchEnrollment>>(ApiRoutes.BATCH_ENROLLMENTS, enrollform, enrollform._id!).subscribe({
        next: (res: IApiResponse<IBatchEnrollment>) => {
          if (res.result) {
            callback();
          }
           this.notify.show('success', res.message);
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
  
  
  enrollmentList = signal<IBatchEnrollment[]>([]);
  allEnrollmentList = signal<IBatchEnrollment[]>([]);
  enrollmentListByCandidateID = signal<IBatchEnrollment[]>([]);

  getEnrollments() {
    const http = this.http.get<IApiResponse<IBatchEnrollment[]>>(ApiRoutes.ALL_ENROLLMENTS).subscribe({
      next: (res: IApiResponse<IBatchEnrollment[]>) => {
        if (res.result) {
          this.enrollmentList.set(res.data!);
          this.allEnrollmentList.set(res.data!);
        }
        this.notify.show('success', res.message);
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

  getEnrollmentById(enrollmentId: number, cb: (data: IBatchEnrollment) => void) {
      this.http.get<IApiResponse<IBatchEnrollment>>(`${ApiRoutes.GET_ENROLLMENT_BY_ID}?enrollmentid=${enrollmentId}`).subscribe({
        next: (res: IApiResponse<IBatchEnrollment>) => {
          if (res.result) {
            cb(res.data!);
          }
          this.notify.show('success', res.message);
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

    getEnrollmentByCandidateId(candidateId: string) {
      this.http.get<IApiResponse<IBatchEnrollment[]>>(`${ApiRoutes.GET_ENROLLMENT_BY_CANDIDATE_ID}${candidateId}`).subscribe({
        next: (res: IApiResponse<IBatchEnrollment[]>) => {
          if (res.result) {
            this.enrollmentListByCandidateID.set(res.data!);
          }
          this.notify.show('success', res.message);
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

    deleteBatchByID(enrollmentId: string, callback: () => void) {
      this.http.delete<IApiResponse<null>>(ApiRoutes.BATCH_ENROLLMENTS, enrollmentId).subscribe({
        next: (res: IApiResponse<null>) => {
          if (res.result) {
            callback();
          }
          this.notify.show('success', res.message);
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
