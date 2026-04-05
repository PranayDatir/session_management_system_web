import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { faGraduationCap, faCalendarDay, faLayerGroup, faSignOutAlt, faUserPlus, faUsers, faHome, faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Authuser } from '../../core/services/authuser';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from '../profile/profile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterOutlet, RouterLinkActive, FontAwesomeModule, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  router = inject(Router);
  faGraduationCap = faGraduationCap;
  faLayerGroup = faLayerGroup;
  faUsers = faUsers;
  faUserPlus = faUserPlus;
  faSignOutAlt = faSignOutAlt;
  faCalendarDay = faCalendarDay;
  faHome = faHome;

  faSearch = faSearch;
  faBell = faBell;

  logoUrl: string = '/assets/learning_partner_logo.jpg'

  logout() {
    localStorage.removeItem('candidate');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  authUser = inject(Authuser);

  ngOnInit() {
    console.log('authUser.user ---> ', this.authUser.user);
  }

  constructor(public dialog: MatDialog) {

  }

  openProfile() {
    this.dialog.open(Profile, {
      width: '90%',
      height: '80%',
      enterAnimationDuration: '400ms', // Speed of opening
      exitAnimationDuration: '300ms',  // Speed of closing
    });
  }




}
