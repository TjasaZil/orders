import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from "@angular/forms";
import { Order, OrderDetails } from "src/app/models/order/order";
import { CrudService } from "src/app/service/crud.service";

@Component({
  selector: 'app-add-order-form',
  templateUrl: './add-order-form.component.html',
  styleUrls: ['./add-order-form.component.scss']
})
export class AddOrderFormComponent implements OnInit{

ngOnInit(): void {}


}
