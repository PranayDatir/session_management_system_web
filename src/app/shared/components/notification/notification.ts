import { Component, DestroyRef, inject } from '@angular/core';
import { INotification, Notify } from '../../../core/services/notify';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faExclamation,
  faCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification {
  private readonly destroyRef = inject(DestroyRef);

  notifications: INotification[] = [];

  constructor(private notificationService: Notify) { }

  faCheckCircle = faCheckCircle;
  faExclamation = faExclamation;
  faCircle = faCircle;
  faTimes = faTimes;

  ngOnInit() {
    this.notificationService.notification$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((notification) => {
        this.notifications.push(notification);

        setTimeout(() => {
          this.remove(notification.id);
        }, 3000);
      });
  }

  remove(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  getNotificationClass(type: INotification['type']) {
    return `notification-card ${type}`;
  }

  getIcon(type: INotification['type']) {
    switch (type) {
      case 'error':
        return this.faExclamation;
      case 'info':
        return this.faCircle;
      case 'warning':
        return this.faExclamation;
      case 'success':
      default:
        return this.faCheckCircle;
    }
  }

}
