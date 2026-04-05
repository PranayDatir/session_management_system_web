import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface INotification {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}


@Injectable({
  providedIn: 'root',
})
export class Notify {

  private notificationSubject = new Subject<INotification>();

  public notification$ = this.notificationSubject.asObservable();

  show(type: INotification['type'], message: string) {
    const notification: INotification = {
      id: new Date().getTime(),
      type,
      message,
    };

    this.notificationSubject.next(notification);
  }
}
