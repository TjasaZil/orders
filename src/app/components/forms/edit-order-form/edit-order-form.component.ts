import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-order-form',
  templateUrl: './edit-order-form.component.html',
  styleUrls: ['./edit-order-form.component.scss']
})
export class EditOrderFormComponent {

  @Output() closingModal = new EventEmitter<boolean>();

  closeModal(){
    this.closingModal.emit(true)
    
  }
}
