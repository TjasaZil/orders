import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order/order';
import { CrudService } from 'src/app/service/crud.service';
import { ToasterData } from 'src/app/models/toaster/toaster';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  modalAddClosed: boolean = true;
  modalEditClosed: boolean = true;
  modalDeleteClosed: boolean = true;
  openedOrderId: string | null | undefined = null;
  chosenFunctionality: string | null | undefined = null;
  orderObj: Order = new Order();
  orderArr: Order[] = [];
  selectedOrderForEdit: Order | undefined;
  selectedOrderForDelete: Order | undefined;

  toasterData: ToasterData = {
    message: '',
    type: 'added', // default type
    visible: false,
  };

  constructor(
    private crud: CrudService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

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
        this.showToaster('Order was successfully added.', 'added');
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
        this.showToaster('Order was successfully edited.', 'edited');
      },
      (err) => {
        alert('Unable to edit the order!');
      }
    );
  }

  deleteOrder(order: Order) {
    this.crud.deleteOrder(order).subscribe(
      (res) => {
        this.orderArr = this.orderArr.filter((o) => o.id !== order.id);
        this.showToaster('Order was successfully deleted.', 'deleted');
      },
      (err) => {
        console.error('Error deleting order:', err);
      }
    );
  }

  /** opening modals and handling their state */
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
    this.selectedOrderForEdit = undefined;
  }
  handleEditModalClose(isModalClosed: boolean): void {
    this.modalEditClosed = isModalClosed;
    this.modalAddClosed = isModalClosed;
    this.selectedOrderForEdit = undefined;
  }
  handleDeleteModalClose(isModalClosed: boolean): void {
    this.modalDeleteClosed = isModalClosed;
    this.selectedOrderForDelete = undefined;
  }

  /** simple log out functionality */
  LogOut() {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  /** opening more info on an order */
  openOrder(Id?: string) {
    if (this.openedOrderId === Id) {
      this.openedOrderId = '';
    } else {
      this.openedOrderId = Id;
    }
  }

  /** open to choose to edit or delete order */
  chooseFunctionality(Id?: string) {
    if (this.chosenFunctionality === Id) this.chosenFunctionality = '';
    else this.chosenFunctionality = Id;
  }
  /** toaster */
  showToaster(message: string, type: 'added' | 'edited' | 'deleted') {
    this.toasterData = { message, type, visible: true };
    this.cdr.detectChanges(); // Manually trigger change detection

    setTimeout(() => {
      this.toasterData.visible = false;
      this.cdr.detectChanges(); // Trigger again after hiding the toaster
    }, 8000);
  }
}
