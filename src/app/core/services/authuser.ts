import { Injectable } from '@angular/core';
import { IUser } from '../models/Candidate';

@Injectable({
  providedIn: 'root',
})
export class Authuser {

  user: IUser ;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('candidate') || '{}') as IUser;
  }
  
}
