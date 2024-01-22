import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order/order';
import { CrudService } from 'src/app/service/crud.service';
/*import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';*/

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  /*animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, display: 'block' })),
      state('out', style({ opacity: 0, display: 'none' })),
      transition('out => in', [animate('1s ease-in')]),
      transition('in => out', [animate('1s ease-out')]),
    ]),
  ],*/
})
export class OrdersListComponent implements OnInit {
  modalAddClosed: boolean = true;
  modalEditClosed: boolean = true;
  modalDeleteClosed: boolean = true;
  //orderOpened:boolean=false;
  openedOrderId: string | null | undefined = null;
  chosenFunctionality: string | null | undefined = null;
  orderObj: Order = new Order();
  orderArr: Order[] = [];
  selectedOrderForEdit: Order | undefined;
  selectedOrderForDelete: Order | undefined;

  constructor(private crud: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.orderObj = new Order();
    this.orderArr = [];
    this.getAllObjects();
  }

  /** CRUD order operations */
  getAllObjects() {
    this.crud.showAllOrders().subscribe(
      (res) => {
        this.orderArr = res;
      },
      (err) => {
        alert('Unable to get the list of orders');
      }
    );
  }

  addOrder(order: Order) {
    this.crud.addOrder(order).subscribe(
      (res) => {
        this.orderArr.push(res);
        console.log(this.modalAddClosed);
      },
      (err) => {
        alert('Unable to add the order!');
      }
    );
  }

  editOrder(order: Order) {
    this.crud.editOrder(order).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Unable to edit the order!');
      }
    );
  }

  deleteOrder(order: Order) {
    this.crud.deleteOrder(order).subscribe(
      (res) => {
        // Handle the response, e.g., remove the order from the list
        this.orderArr = this.orderArr.filter((o) => o.id !== order.id);
      },
      (err) => {
        // Handle the error
        console.error('Error deleting order:', err);
      }
    );
  }

  openAddModal() {
    this.modalAddClosed = false;
  }

  openEditModal(order: Order) {
    this.selectedOrderForEdit = order;
    this.modalEditClosed = false;
  }
  openDeleteModal(order: Order) {
    this.selectedOrderForDelete = order;
    this.modalDeleteClosed = false;
  }
  handleAddModalClose(isModalClosed: boolean): void {
    this.modalAddClosed = isModalClosed;
    this.selectedOrderForEdit = undefined; // Reset for edit scenario
  }
  handleEditModalClose(isModalClosed: boolean): void {
    this.modalEditClosed = isModalClosed;
    this.modalAddClosed = isModalClosed;
    this.selectedOrderForEdit = undefined; // Reset for edit scenario
  }
  handleDeleteModalClose(isModalClosed: boolean): void {
    this.modalDeleteClosed = isModalClosed;
    this.selectedOrderForDelete = undefined;
  }

  LogOut() {
    this.router.navigate(['/'], { replaceUrl: true });
  }
  openOrder(Id?: string) {
    //this.orderOpened=!this.orderOpened
    if (this.openedOrderId === Id) {
      // If the clicked order is already open, close it
      this.openedOrderId = '';
    } else {
      // Otherwise, open the clicked order
      this.openedOrderId = Id;
    }
  }

  chooseFunctionality(Id?: string) {
    if (this.chosenFunctionality === Id) this.chosenFunctionality = '';
    else this.chosenFunctionality = Id;
  }
}
