import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from "@angular/forms";
import { Order, OrderDetails } from "src/app/models/order/order";

@Component({
  selector: 'app-add-order-form',
  templateUrl: './add-order-form.component.html',
  styleUrls: ['./add-order-form.component.scss']
})
export class AddOrderFormComponent implements OnInit{

ngOnInit(): void {}

@Output() closingModal = new EventEmitter<boolean>();
@Output() addNewOrder = new EventEmitter<Order>();

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

/** emitting to close the modal */
closeModal(){
  this.closingModal.emit(true)
  console.log(this.closingModal)
}
/** emitting to add a new order*/

newOrder() {
  const formData = this.addOrderForm.value as Partial<Order>;

  // Ensure all required fields are properly set
  const newOrder: Order = {
    ...formData,
  omsId: formData.omsId || '', // Handle potential null or undefined values
  products: formData.products || [], // Ensure products is always an array
  orderDetails: formData.orderDetails || new OrderDetails() // Ensure orderDetails is properly set
};
this.addNewOrder.emit(newOrder);
console.log(newOrder);
}

/* Adding new product form */
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
