export class Order {
  id?: string='';
  omsId: string='';
  products: OrderProduct[]= [];
  orderDetails: OrderDetails = new OrderDetails();
}

export class OrderProduct {
  gtin: string= '';
  quantity: number = 0;
  serialNumberType: string = '';
  serialNumbers: string = '';
  templateId: string = '';
}

export class OrderDetails {
  factoryId?: string = '';
  factoryName?: string = '';
  factoryAddress                                                                                                                                : string = '';
  factoryCountry: string = '';
  productionLineId: string = '';
  productCode: string = '';
  productDescription: string = '';
  poNumber: string = '';
  expectedStartDate: string = '';
}
