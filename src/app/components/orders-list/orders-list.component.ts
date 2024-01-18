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

  formClosed:boolean=true;
  modalClosed:boolean=true;
  orderObj :Order = new Order();
  orderArr : Order[]= [];
  addOrderValue: object = {}; 

  addOrderForm = new FormGroup({
    omsId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
    products: new FormArray([
      new FormGroup({
        gtin: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
        quantity: new FormControl(0, [Validators.required]),
        serialNumberType: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
        serialNumbers: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
        templateId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')])
      })
    ]),
    orderDetails: new FormGroup({
      factoryId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
      factoryName: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
      factoryAddress: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
      factoryCountry: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
      productionLineId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
      productCode: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
      productDescription: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
      poNumber: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
      expectedStartDate: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 _-]+$')])
    })
  });
  
  
  constructor(private crud:CrudService){
  }

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


  
  addOrder() {
      const formData = this.addOrderForm.value as Partial<Order>;
  
      // Ensure all required fields are properly set
      const newOrder: Order = {
        ...formData,
      omsId: formData.omsId || '', // Handle potential null or undefined values
      products: formData.products || [], // Ensure products is always an array
      orderDetails: formData.orderDetails || new OrderDetails() // Ensure orderDetails is properly set
    };
  
      this.crud.addOrder(newOrder).subscribe(
        res => {
          this.orderArr.push(res);
          this.addOrderForm.reset();
          this.openForm();
        },
        err => {
          alert(err);
        }
      );
  }
  
  editOrder(){/*
    this.crud.editOrder(this.orderObj).subscribe(
      res=>{
        this.ngOnInit();
      }, err=>{
        alert('Unable to edit the order!')
      }
    )*/
    this.openModal();
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
openForm(){
  this.formClosed=!this.formClosed;
  console.log(this.formClosed)
}
openModal(){
  this.modalClosed=!this.modalClosed;
  console.log(this.modalClosed)
}
get products(): FormArray {
  return this.addOrderForm.get('products') as FormArray;
}
addProduct() {
  const productForm = new FormGroup({
    gtin: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
    quantity: new FormControl(0, [Validators.required]),
    serialNumberType: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
    serialNumbers: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
    templateId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')])
  });

  this.products.push(productForm);
}



}
