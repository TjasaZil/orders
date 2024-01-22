import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Order } from 'src/app/models/order/order';

@Component({
  selector: 'app-delete-order',
  template: `<div class="popup-background">
    <div class="delete-popup">
      <div class="delete-icon">
        <button (click)="closeModal()">
          <img src="../../../assets/icons/close.svg" alt="" class="" />
        </button>
      </div>

      <div class="delete-order-text">
        <img src="../../../assets/icons/error.svg" alt="" class="" />
        <p class="h-advent-medium">
          Are you really sure you want to delete the selected order?
        </p>
        <div class="delete-order-btns">
          <button (click)="closeModal()" class="btn-outline-orange">
            Cancel
          </button>
          <button (click)="confirmDeletion()" class="btn-outline-orange">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./delete-order.component.scss'],
})
export class DeleteOrderComponent {
  @Output() closingModal = new EventEmitter<boolean>();
  @Output() confirmDelete = new EventEmitter<Order>();
  @Input() orderToDelete?: Order;

  closeModal() {
    this.closingModal.emit(true);
    console.log(this.closingModal);
  }

  confirmDeletion() {
    if (this.orderToDelete) {
      this.confirmDelete.emit(this.orderToDelete);
      this.closeModal();
    }
  }
}
