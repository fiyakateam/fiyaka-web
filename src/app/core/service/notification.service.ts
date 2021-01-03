import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, Observable } from 'rxjs';

export enum NotificationType {
  Info,
  Success,
  Error,
}

export class Notification {
  constructor(public message: string, public type?: NotificationType) {}
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationSubject: BehaviorSubject<Notification[]>;
  public readonly notification$: Observable<Notification[]>;

  constructor(private nzMessageService: NzMessageService) {
    this.notificationSubject = new BehaviorSubject<Notification[]>([]);
    this.notification$ = this.notificationSubject.asObservable();
  }

  public get last(): Notification[] {
    return this.notificationSubject.getValue();
  }

  public pushWithSuccess(
    success: boolean,
    successMessage: string,
    errorMessage: string
  ): void {
    const notification = new Notification(
      success ? successMessage : errorMessage,
      success ? NotificationType.Success : NotificationType.Error
    );
    this.renderNotification(notification);
  }

  public pushError(errorMessage: string): void {
    this.pushWithSuccess(false, '', errorMessage);
  }

  public pushSuccess(successMessage: string): void {
    this.pushWithSuccess(true, successMessage, '');
  }

  public push(message: string, type?: NotificationType): void {
    const notification = new Notification(message, type);
    this.renderNotification(notification);
  }

  private renderNotification(notification: Notification): void {
    const previousList = this.last;
    this.notificationSubject.next([...previousList, notification]);
    const notificationType = this.getNotificationTypeName(notification);
    const message = notification.message;
    if (notificationType) {
      this.nzMessageService.create(notificationType, message);
    } else {
      this.nzMessageService.info(message);
    }
  }

  private getNotificationTypeName(notification: Notification): string {
    switch (notification.type) {
      case NotificationType.Info:
        return 'info';
      case NotificationType.Error:
        return 'error';
      case NotificationType.Success:
        return 'success';
      default:
        return null;
    }
  }
}
