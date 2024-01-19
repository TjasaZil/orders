import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from "@angular/forms";
import { Order, OrderDetails } from "src/app/models/order/order";

@Component({
  selector: 'app-edit-order-form',
  templateUrl: './edit-order-form.component.html',
  styleUrls: ['./edit-order-form.component.scss']
})
export class EditOrderFormComponent {

  //@Output() closingModal = new EventEmitter<boolean>();
  //@Output() editExistingOrder = new EventEmitter<Object>()
  //@Input() order?: Order;

  ngOnInit() {
    //this.populateFormWithOrderData();
  }
/*
  populateFormWithOrderData() {
    if (this.order) {
      this.editOrderForm.patchValue({
        omsId: this.order.omsId,
        products: this.order.products,
        orderDetails : this.order.orderDetails
      });
    }}
    populateFormWithOrderData() {
      if (this.order) {
        this.editOrderForm.patchValue({
          omsId: this.order.omsId,
          // other fields not in products or orderDetails
        });
    
        // Handle products
        const productsArray = this.editOrderForm.get('products') as FormArray;
        productsArray.clear(); // Clear existing form groups
    
        this.order.products.forEach(product => {
          const productGroup = new FormGroup({
            gtin: new FormControl(product.gtin, [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
            quantity: new FormControl(product.quantity, [Validators.required]),
            serialNumberType: new FormControl(product.serialNumberType, [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
            serialNumbers: new FormControl(product.serialNumbers, [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
            templateId: new FormControl(product.templateId, [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')])
          });
          productsArray.push(productGroup);
        });
    
        
      }
    }
     
editOrderForm = new FormGroup({
  omsId: new FormControl( "", [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
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

editOrder() {
  const formData = this.editOrderForm.value as Partial<Order>;

  // Ensure all required fields are properly set
  const editOrder: Order = {
    ...formData,
  omsId: formData.omsId || '', // Handle potential null or undefined values
  products: formData.products || [], // Ensure products is always an array
  orderDetails: formData.orderDetails || new OrderDetails() // Ensure orderDetails is properly set
};
this.editExistingOrder.emit(editOrder);
console.log(editOrder);
}

get all the products 
get products(): FormArray {
  return this.editOrderForm.get('products') as FormArray;
}
close the modal
  closeModal(){
    this.closingModal.emit(true)
  }*/
}