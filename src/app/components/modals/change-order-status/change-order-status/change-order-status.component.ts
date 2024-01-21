import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Order } from 'src/app/models/order/order';

@Component({
  selector: 'app-change-order-status',
  templateUrl: './change-order-status.component.html',
  styleUrls: ['./change-order-status.component.scss'],
})
export class ChangeOrderStatusComponent {
  @Output() closingModal = new EventEmitter<boolean>();
  @Output() confirmChange = new EventEmitter<Order>(); // Add this line
  @Input() statusToChange?: Order; // Rename this for clarity

  closeModal() {
    this.closingModal.emit(true);
    console.log(this.closingModal);
  }

  confirmStatus() {
    if (this.statusToChange) {
      this.confirmChange.emit(this.statusToChange);
      this.closeModal(); // Close the modal after confirming
    }
  }
}
