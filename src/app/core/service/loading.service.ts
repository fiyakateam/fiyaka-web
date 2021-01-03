import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly loadingSubject: BehaviorSubject<boolean>;
  public readonly loading$: Observable<boolean>;

  constructor() {
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading$ = this.loadingSubject.asObservable();
  }

  public get isLoading(): boolean {
    return this.loadingSubject.getValue();
  }

  public start(): void {
    this.loadingSubject.next(true);
  }

  public stop(): void {
    this.loadingSubject.next(false);
  }
}
