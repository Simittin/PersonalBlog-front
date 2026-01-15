import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../../core/services/content.service';
import { Message } from '../../../core/models/message';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.getAllMessages();
  }

  getAllMessages() {
    this.contentService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }

  deleteMessage(id: number) {
    if (confirm('Bu mesajı silmek istediğinize emin misiniz?')) {
      this.contentService.deleteMessage(id).subscribe(() => {
        this.messages = this.messages.filter(m => m.id !== id);
      });
    }
  }
}
