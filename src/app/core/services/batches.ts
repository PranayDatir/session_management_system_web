import { inject, Injectable, signal } from '@angular/core';
import { ApiRoutes } from '../constants/ApiRoutes';
import { IApiResponse } from '../Interfaces/ApiResponse';
import { IBatch } from '../models/Batch';
import { Http } from './http';
import { Notify } from './notify';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  http = inject(Http);
  batchData = signal<IBatch[]>([]);
  allBatchData = signal<IBatch[]>([]);
  notify = inject(Notify);
  getBatches() {
    this.http.get<IApiResponse<IBatch[]>>(ApiRoutes.BATCHES).subscribe({
      next: (res: IApiResponse<IBatch[]>) => {
        if (res.result) {
          this.batchData.set(res.data!);
          this.allBatchData.set(res.data!);
          this.notify.show('success', res.message);
        } else {
          this.notify.show('error', res.message);

        }
      },
      error: (err) => {
        console.log(err);
        this.notify.show('error', 'Internal Server Error');
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  filterBatches(event: any) {
    const filter = event.target.value;
    console.log(filter);
    if (filter === null || (filter as any) === '') {
      this.getBatches();
    } else {
      this.batchData.set(this.batchData().filter((batch: IBatch) => batch.isActive === filter));
    }
  }

  addEditBatch(batch: IBatch, callback: () => void) {
    if (batch._id === undefined) {
      this.http.post<IApiResponse<IBatch>>(ApiRoutes.BATCHES, batch).subscribe({
        next: (res: IApiResponse<IBatch>) => {
          callback();
          this.notify.show('success', res.message);
        },
        error: (err) => {
          console.log(err);
          this.notify.show('error', 'Internal Server Error');
        },
        complete: () => {
          console.log('complete');
        },
      });
    } else {
      this.http.put<IApiResponse<IBatch>>(ApiRoutes.BATCHES, batch, batch._id).subscribe({
        next: (res: IApiResponse<IBatch>) => {
          callback();
          this.notify.show('success', res.message);
        },
        error: (err) => {
          console.log(err);
          this.notify.show('error', 'Internal Server Error');
        },
        complete: () => {
          console.log('complete');
        },
      });
    }
  }


  getBatchById(_id: string, cb: (data: IBatch) => void) {
    this.http.get<IApiResponse<IBatch>>(ApiRoutes.BATCHES, _id).subscribe({
      next: (res: IApiResponse<IBatch>) => {
        if (res.result) {
          cb(res.data!);
          this.notify.show('success', res.message);
        } else {
          this.notify.show('error', res.message);
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

  deleteBatchByID(batchId: string, callback?: () => void) {
    this.http.delete<IApiResponse<IBatch>>(ApiRoutes.BATCHES, batchId).subscribe({
      next: (res: IApiResponse<IBatch>) => {
        if (res.result == true) { callback?.(); this.notify.show('success', res.message); } else {
          this.notify.show('error', res.message);
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
