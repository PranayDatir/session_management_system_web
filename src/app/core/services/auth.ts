import { inject, Injectable } from '@angular/core';
import { Http } from './http';
import { IBatchLoginRequestModel } from '../models/BatchLoginRequestModel';
import { IUser } from '../models/Candidate';
import { IApiResponse, IAuthApiResponse } from '../Interfaces/ApiResponse';
import { ApiRoutes } from '../constants/ApiRoutes';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(Http);
  login(body: IBatchLoginRequestModel) {
    return this.http.post<IAuthApiResponse<IUser>>(ApiRoutes.BATCH_USER_LOGIN, body);
  }
}
