import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../service/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingHttpInterceptor implements HttpInterceptor {
  private activeRequestCount: number;

  constructor(private loadingService: LoadingService) {
    this.activeRequestCount = 0;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.activeRequestCount === 0) {
      this.loadingService.start();
    }

    this.activeRequestCount++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequestCount--;
        if (this.activeRequestCount === 0) {
          this.loadingService.stop();
        }
      })
    );
  }
}
