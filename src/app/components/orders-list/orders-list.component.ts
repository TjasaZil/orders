import { Component, OnInit } from '@angular/core';
import { Order } from "src/app/models/order/order";
import { CrudService } from "src/app/service/crud.service";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit{

  orderObj :Order = new Order();
  orderArr : Order[]= [];
  addOrderValue: object = {};

  constructor(private crud:CrudService){}

  ngOnInit():void{
    this.orderObj= new Order();
    this.orderArr=[];
    this.getAllObjects();
  }

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

  addOrder(eorder:Order){
    this.crud.addOrder(eorder).subscribe(
      res=>{
        this.ngOnInit();
      }, err=>{
        alert(err);
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
}
