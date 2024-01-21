import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Order, OrderDetails } from 'src/app/models/order/order';

@Component({
  selector: 'app-add-order-form',
  templateUrl: './add-order-form.component.html',
  styleUrls: ['./add-order-form.component.scss'],
})
export class AddOrderFormComponent implements OnInit {
  openedProductId: number | null | undefined = 0;
  @Output() closingModal = new EventEmitter<boolean>();
  @Output() addNewOrder = new EventEmitter<Order>();
  @Output() editExistingOrder = new EventEmitter<Order>();
  @Input() editOrder?: Order;

  ngOnInit(): void {
    if (this.editOrder) {
      this.populateForm();
    }
  }

  populateForm() {
    // Ensure editOrder is defined
    if (!this.editOrder) return;

    this.addOrderForm.patchValue({
      omsId: this.editOrder.omsId ?? '',
      // other top-level fields if present
    });

    const productsArray = this.addOrderForm.get('products') as FormArray;
    productsArray.clear(); // Clear existing form groups

    this.editOrder.products?.forEach((product) => {
      const productGroup = new FormGroup({
        gtin: new FormControl(product.gtin ?? '', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 _-]+$'),
        ]),
        quantity: new FormControl(product.quantity ?? 0, [Validators.required]),
        serialNumberType: new FormControl(product.serialNumberType ?? '', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 _-]+$'),
        ]),
        serialNumbers: new FormControl(product.serialNumbers ?? '', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 _-]+$'),
        ]),
        templateId: new FormControl(product.templateId ?? '', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 _-]+$'),
        ]),
      });
      productsArray.push(productGroup);
    });

    if (this.editOrder.orderDetails) {
      this.addOrderForm.get('orderDetails')?.patchValue({
        factoryId: this.editOrder.orderDetails.factoryId ?? '',
        factoryName: this.editOrder.orderDetails.factoryName ?? '',
        factoryAddress: this.editOrder.orderDetails.factoryAddress ?? '',
        factoryCountry: this.editOrder.orderDetails.factoryCountry ?? '',
        productionLineId: this.editOrder.orderDetails.productionLineId ?? '',
        productCode: this.editOrder.orderDetails.productCode ?? '',
        productDescription:
          this.editOrder.orderDetails.productDescription ?? '',
        poNumber: this.editOrder.orderDetails.poNumber ?? '',
        expectedStartDate: this.editOrder.orderDetails.expectedStartDate ?? '',
      });
    }
  }

  addOrderForm = new FormGroup({
    omsId: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9 _-]+$'),
    ]),
    products: new FormArray([
      new FormGroup({
        gtin: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 _-]+$'),
        ]),
        quantity: new FormControl(0, [Validators.required]),
        serialNumberType: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 _-]+$'),
        ]),
        serialNumbers: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 _-]+$'),
        ]),
        templateId: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 _-]+$'),
        ]),
      }),
    ]),
    orderDetails: new FormGroup({
      factoryId: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]),
      factoryName: new FormControl('', [
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]),
      factoryAddress: new FormControl('', [
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]),
      factoryCountry: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]),
      productionLineId: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]),
      productCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]),
      productDescription: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]),
      poNumber: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 _-]+$')]),
      expectedStartDate: new FormControl('', [
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]),
    }),
  });

  /** emitting to close the modal */
  closeModal() {
    this.closingModal.emit(true);
    console.log(this.closingModal);
  }
  /** emitting to add a new order*/

  newOrder() {
    const formData = this.addOrderForm.value as Partial<Order>;

    // Ensure all required fields are properly set
    const newOrder: Order = {
      ...formData,
      omsId: formData.omsId || '', // Handle potential null or undefined values
      products: formData.products || [], // Ensure products is always an array
      orderDetails: formData.orderDetails || new OrderDetails(), // Ensure orderDetails is properly set
    };
    if (this.editOrder)
      this.editExistingOrder.emit({ ...this.editOrder, ...formData });
    else {
      this.addNewOrder.emit(newOrder);
    }
    this.closingModal.emit(true);
  }

  /* Adding new product form */
  get products(): FormArray {
    return this.addOrderForm.get('products') as FormArray;
  }
  addProduct() {
    const productForm = new FormGroup({
      gtin: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]),
      quantity: new FormControl(0, [Validators.required]),
      serialNumberType: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]),
      serialNumbers: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]),
      templateId: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]),
    });

    this.products.push(productForm);
  }
  openProduct(id?: number) {
    this.openedProductId = this.openedProductId === id ? null : id;
  }
}
