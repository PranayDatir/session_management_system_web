import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { faGraduationCap, faCalendarDay, faLayerGroup, faSignOutAlt, faUserPlus, faUsers, faHome, faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Authuser } from '../../core/services/authuser';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from '../profile/profile';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Search } from '../../core/services/search';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterOutlet, RouterLinkActive, FontAwesomeModule, CommonModule, ReactiveFormsModule],
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

  searchControl = new FormControl('');

  logoUrl: string = '/assets/learning_partner_logo.jpg'

  logout() {
    localStorage.removeItem('candidate');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  authUser = inject(Authuser);
  searchService = inject(Search);

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        // takeUntil(this.searchService.destroyBatchSearch$)
      )
      .subscribe((searchTerm) => {
        this.searchService.updateSearch(searchTerm ?? '');
      });
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
