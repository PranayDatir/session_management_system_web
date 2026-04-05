import { Component, inject, OnInit } from '@angular/core';
import { Dashboardservice } from '../../core/services/dashboardservice';
import { Authuser } from '../../core/services/authuser';
import { Role } from '../../core/constants/Roles';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faLayerGroup, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  dashboardService = inject(Dashboardservice);
  authUser = inject(Authuser);

  super_admin = Role.SUPER_ADMIN;
  candidate = Role.CANDIDATE;

  faUsers = faUsers;
  faUserPlus = faUserPlus;
  faLayerGroup = faLayerGroup;

  ngOnInit() {
    if (this.authUser.user.role === Role.CANDIDATE) {
      this.dashboardService.getCandidateDashboardData(this.authUser.user._id!);
    } else if (this.authUser.user.role === Role.SUPER_ADMIN) {
      this.dashboardService.getAdminDashboardData();
      this.dashboardService.getAllBatchCandidateStats();
    }
  }

}
