import { Component } from '@angular/core';
import { INotification, Notify } from '../../../core/services/notify';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification {


  notifications: INotification[] = [];

  constructor(private notificationService: Notify) { }

  faCheckCircle = faCheckCircle;
  faTimes = faTimes;

  ngOnInit() {
    this.notificationService.notification$.subscribe(notification => {
      this.notifications.push(notification);

      setTimeout(() => {
        this.remove(notification.id);
      }, 3000);
    });
  }

  remove(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

}
