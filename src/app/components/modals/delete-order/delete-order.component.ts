import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Order } from 'src/app/models/order/order';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.scss'],
})
export class DeleteOrderComponent {
  @Output() closingModal = new EventEmitter<boolean>();
  @Output() confirmDelete = new EventEmitter<Order>(); // Add this line
  @Input() orderToDelete?: Order; // Rename this for clarity

  closeModal() {
    this.closingModal.emit(true);
    console.log(this.closingModal);
  }
  // Add a new method to confirm deletion
  confirmDeletion() {
    if (this.orderToDelete) {
      this.confirmDelete.emit(this.orderToDelete);
      this.closeModal(); // Close the modal after confirming
    }
  }
}
