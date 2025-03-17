import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showSuccess(summary: string, detail: string) {
    this.messageService.add({ severity: 'success', summary, detail, life: 3000 });
  }

  showError(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary, detail, life: 3000 });
  }

  showInfo(summary: string, detail: string) {
    this.messageService.add({ severity: 'info', summary, detail, life: 3000 });
  }

  showWarning(summary: string, detail: string) {
    this.messageService.add({ severity: 'warn', summary, detail, life: 3000 });
  }
}
