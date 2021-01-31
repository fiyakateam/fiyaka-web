import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ConversationModel } from '../model/api/fiyaka_api';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly conversationsSubject: BehaviorSubject<
    Array<ConversationModel>
  >;
  public readonly conversations$: Observable<Array<ConversationModel>>;

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
    this.socket.on('message', (data) => {
      console.log(`message: ${data}`);
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
}
