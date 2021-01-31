import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConversationModel } from '../../model/api/fiyaka_api';
import { Tenant } from '../../model/tenant.model';
import { ChatService } from '../../service/chat.service';

@Component({
  selector: 'app-chat-tenant',
  templateUrl: './chat-tenant.component.html',
  styleUrls: ['./chat-tenant.component.css'],
})
export class ChatTenantComponent implements OnInit {
  private chatSubscription: Subscription;
  tenant: Tenant;
  currentInput: string = '';

  conversations: Array<ConversationModel> = [];
  conversation: ConversationModel = null;

  constructor(private chatService: ChatService) {
    this.tenant = this.chatService.currentTenant;
  }

  ngOnInit(): void {
    console.log(`Got tenant ${this.tenant.name}`);
    this.chatSubscription = this.chatService.conversations$.subscribe(
      (conversations) => {
        this.conversations = conversations;
        this.conversation = this.getConversation();
      }
    );
    this.chatService.join();
  }

  getConversation(): ConversationModel {
    for (let i = 0; i < this.conversations.length; i++) {
      let conversation = this.conversations[i];
      if (conversation.tenant === this.tenant.id) {
        return conversation;
      }
    }
    return null;
  }

  ownerText(id: string) {
    if (id === this.tenant.id) {
      return this.tenant.name;
    } else {
      return 'You';
    }
  }

  sendMessage() {
    this.chatService.send(this.currentInput, this.tenant.id);
  }
}
