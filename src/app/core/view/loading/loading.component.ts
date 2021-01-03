import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements AfterViewInit, OnDestroy {
  private loadingSubscription: Subscription;
  isVisible = false;
  loadingId: any;

  constructor(
    private loadingService: LoadingService,
    private message: NzMessageService
  ) {}

  ngAfterViewInit(): void {
    this.loadingSubscription = this.loadingService.loading$.subscribe(
      (loading) => {
        if (loading) {
          this.loadingId = this.message.loading('Loading...', {
            nzDuration: 0,
          }).messageId;
        } else {
          this.message.remove(this.loadingId);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
