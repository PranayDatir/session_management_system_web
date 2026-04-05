import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Notification } from "./shared/components/notification/notification";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Notification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('batch_recording_application_web');

}
