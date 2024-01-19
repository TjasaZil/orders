import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Order} from "src/app/models/order/order";
import { CrudService } from "src/app/service/crud.service";


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit{

  
  modalAddClosed:boolean=true;
  modalEditClosed:boolean=true;
  //orderOpened:boolean=false;
  openedOrderId: string | null |undefined = null;
  chosenFunctionality:boolean=false;
  orderObj :Order = new Order();
  orderArr : Order[]= [];
  selectedOrderForEdit: Order | undefined;
  
  
  constructor(private crud:CrudService, private router:Router){
  }

  ngOnInit():void{
    this.orderObj= new Order();
    this.orderArr=[];
    this.getAllObjects();
  }

  /** CRUD order operations */
  getAllObjects(){
    this.crud.showAllOrders().subscribe(
      res=>{
        this.orderArr=res;
      },
      err=>{
        alert('Unable to get the list of orders');
      }
    )
  }

  addOrder(order: Order){
    this.crud.addOrder(order).subscribe(
      res=>{
        this.orderArr.push(res);
        console.log(this.modalAddClosed)
   
      },err=>{
        alert('Unable to add the order!')
      }
    )
    
  }

  editOrder(order: Order){
    this.crud.editOrder(order).subscribe(
      res=>{
        this.ngOnInit();
      }, err=>{
        alert('Unable to edit the order!')
      }
    )
  }

  deleteOrder(eorder:Order){
    this.crud.deleteOrder(eorder).subscribe(
      res=>{
        this.ngOnInit();
      },err=>{
        alert('Unable to delete the order!')
      }
    )
  }

openAddModal() {
  this.modalAddClosed = false;
}

openEditModal(order: Order) {
  this.selectedOrderForEdit = order;
  this.modalEditClosed = false;
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

LogOut(){
  this.router.navigate(['/'], { replaceUrl: true });
}
openOrder(Id? : string){
  //this.orderOpened=!this.orderOpened
  if (this.openedOrderId === Id) {
    // If the clicked order is already open, close it
    this.openedOrderId = '';
  } else {
    // Otherwise, open the clicked order
    this.openedOrderId = Id;
  }
}

chooseFunctionality(){
  this.chosenFunctionality=!this.chosenFunctionality
}
}
