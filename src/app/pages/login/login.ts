import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IBatchLoginRequestModel } from '../../core/models/BatchLoginRequestModel';
import { Auth } from '../../core/services/auth';
import { IAuthApiResponse } from '../../core/Interfaces/ApiResponse';
import { Router } from '@angular/router';
import { Loadingbutton } from '../../shared/components/loadingbutton/loadingbutton';
import { CommonModule } from '@angular/common';
import { faEnvelope, faEye, faEyeSlash, faGraduationCap, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Notify } from '../../core/services/notify';
import { environment } from '../../../environments/environment';
import { IUser } from '../../core/models/Candidate';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, Loadingbutton, FontAwesomeModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  auth = inject(Auth);
  router = inject(Router);
  notify = inject(Notify);

  faGraduationCap = faGraduationCap;
  faLock = faLock;
  faEnvelope = faEnvelope;
  showPassword: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  AppVer = environment.version;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  logoUrl: string = '/assets/learning_partner_logo.jpg'

  loginObj: IBatchLoginRequestModel = {
    email: '',
    password: ''
  };

  isSubmitting: boolean = false;
  login() {
    this.isSubmitting = true;
    this.auth.login(this.loginObj).subscribe({
      next: (res: IAuthApiResponse<IUser>) => {
        if (res.result) {
          localStorage.setItem('candidate', JSON.stringify(res.data));
          localStorage.setItem('token', res.token);
          this.router.navigate(['/layout']);
          this.notify.show('success', res.message);
        } else {
          this.isSubmitting = false;
          this.notify.show('error', res.message);
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.notify.show('error', err.error.message);
      },
      complete: () => {
      }
    })
  }
}
