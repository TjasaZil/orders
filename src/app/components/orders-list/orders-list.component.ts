import { Component, OnInit } from '@angular/core';
import { Order, OrderDetails } from "src/app/models/order/order";
import { CrudService } from "src/app/service/crud.service";
import { FormControl, FormGroup, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit{

  
  modalAddClosed:boolean=true;
  modalEditClosed:boolean=true;
  orderObj :Order = new Order();
  orderArr : Order[]= [];
  addOrderValue: object = {}; 


  
  
  constructor(private crud:CrudService){
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
    this.openAddModal();
      },err=>{
        alert('Unable to add the order!')
      }
    )
    
  }

  editOrder(){
    this.crud.editOrder(this.orderObj).subscribe(
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

/** handling modal states */

openAddModal(){
  this.modalAddClosed=!this.modalAddClosed;
  console.log(this.modalAddClosed)
}
openEditModal(){
  this.modalEditClosed=!this.modalEditClosed;
  console.log(this.modalEditClosed)
}
handleAddModalClose(isModalClosed: boolean): void {
  this.modalAddClosed = isModalClosed; 
}
handleEditModalClose(isModalClosed: boolean): void {
  this.modalEditClosed = isModalClosed; 
}

}
