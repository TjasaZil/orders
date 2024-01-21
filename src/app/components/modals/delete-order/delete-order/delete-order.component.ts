import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Order } from 'src/app/models/order/order';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.scss'],
})
export class DeleteOrderComponent {
  @Output() closingModal = new EventEmitter<boolean>();

  closeModal() {
    this.closingModal.emit(true);
    console.log(this.closingModal);
  }
}
