import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ConversationModel } from '../model/api/fiyaka_api';
import { Tenant } from '../model/tenant.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly conversationsSubject: BehaviorSubject<
    Array<ConversationModel>
  >;
  public readonly conversations$: Observable<Array<ConversationModel>>;
  public currentTenant: Tenant = null;

  constructor(private socket: Socket, private authService: AuthService) {
    this.conversationsSubject = new BehaviorSubject<Array<ConversationModel>>(
      []
    );
    this.conversations$ = this.conversationsSubject.asObservable();

    this.socket.on('landlord_conversation', (data: any) => {
      let domain = <Array<ConversationModel>>data;
      console.log(`landlord_conversation: ${domain[0].landlord}`);
      this.conversationsSubject.next(domain);
    });
    this.socket.on('message', (data: any) => {
      let domain = <ConversationModel>data;
      console.log(`message: ${domain.landlord}`);
      const last = this.conversationsSubject.value;
      for (let i = 0; i < last.length; i++) {
        if (last[i]._id === domain._id) {
          last[i] = domain;
          break;
        }
      }
      this.conversationsSubject.next(last);
    });
  }

  private getToken(): string {
    const result = this.authService.authStatus();
    if (result.success) {
      return result.user.token;
    } else {
      return null;
    }
  }

  join() {
    const token = this.getToken();
    if (!token) return;
    const payload = {
      token,
    };
    this.socket.emit('join_landlord', payload);
  }

  send(content: string, to: string) {
    const token = this.getToken();
    if (!token) return;
    const payload = {
      token,
      content,
      to,
    };
    this.socket.emit('send_message', payload);
  }
}
