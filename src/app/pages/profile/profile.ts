import { Component, inject } from '@angular/core';
import { Authuser } from '../../core/services/authuser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  authUser = inject(Authuser);

}
