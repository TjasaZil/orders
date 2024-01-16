import { HttpClient } from "@angular/common/http";
import { Injectable, } from '@angular/core';
import { Order } from "../models/order/order";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  orderURL: string;
  constructor(private http: HttpClient) { 
    this.orderURL='http://localhost:3000/orders';
  }

  addOrder(order: Order):Observable<Order>{
    return this.http.post<Order>(this.orderURL, order);
  }
  showAllOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.orderURL);
  }
  deleteOrder(order:Order):Observable<Order>{
    return this.http.delete<Order>(this.orderURL + '/' + order.omsId);
  }
  editOrder(order:Order): Observable<Order>{
    return this.http.put<Order>(this.orderURL + '/' + order. omsId, order);
  }
}
