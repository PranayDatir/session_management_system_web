import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Http {
  http = inject(HttpClient);
  baseUrl = environment.BASE_URL;

  get<T>(url: string, id?: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url + (id ? '/' + id : ''));
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, body);
  }

  put<T>(url: string, body: any, id: string): Observable<T> {
    return this.http.put<T>(this.baseUrl + url + '/' + id, body);
  }

  delete<T>(url: string, id: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url + '/' + id);
  }

  patch<T>(url: string, body: any, id: string): Observable<T> {
    return this.http.patch<T>(this.baseUrl + url + '/' + id, body);
  }
}
