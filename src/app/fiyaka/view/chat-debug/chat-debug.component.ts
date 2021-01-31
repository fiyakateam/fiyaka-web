import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConversationModel } from '../../model/api/fiyaka_api';
import { ChatService } from '../../service/chat.service';

@Component({
  selector: 'app-chat-debug',
  templateUrl: './chat-debug.component.html',
  styleUrls: ['./chat-debug.component.css'],
})
export class ChatDebugComponent implements OnInit {
  private chatSubscription: Subscription;

  conversations: Array<ConversationModel> = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatSubscription = this.chatService.conversations$.subscribe(
      (conversations) => {
        this.conversations = conversations;
      }
    );
  }

  join(): void {
    this.chatService.join();
  }
}
