import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Search {
  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  public destroyBatchSearch$ = new Subject<void>();

  updateSearch(term: string) {
    this.searchSubject.next(term);
    console.log('Search term updated:', term);
  }
}
