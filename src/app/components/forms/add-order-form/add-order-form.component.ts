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
    if (!this.editOrder) return;
    this.addOrderForm.patchValue({
      omsId: this.editOrder.omsId ?? '',
    });

    const productsArray = this.addOrderForm.get('products') as FormArray;
    productsArray.clear();

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
        serialNumbers: new FormControl('', [Validators.required]),
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
      factoryAddress: new FormControl(''),
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
    if (this.addOrderForm.invalid) {
      this.addOrderForm.markAllAsTouched();
      return;
    }
    const formData = this.addOrderForm.value as Partial<Order>;

    const newOrder: Order = {
      ...formData,
      omsId: formData.omsId || '',
      products: formData.products || [],
      orderDetails: formData.orderDetails || new OrderDetails(),
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
      quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
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
    this.openedProductId = this.products.length - 1;
  }
  openProduct(id?: number) {
    this.openedProductId = this.openedProductId === id ? null : id;
  }
  get orderTitle(): string {
    if (this.editOrder && this.editOrder.omsId) {
      return 'Order: ' + this.editOrder.omsId;
    } else {
      return 'Create new order';
    }
  }
}
