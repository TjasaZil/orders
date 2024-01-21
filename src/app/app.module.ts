import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { AddOrderFormComponent } from './components/forms/add-order-form/add-order-form.component';
import { EditOrderFormComponent } from './components/forms/edit-order-form/edit-order-form.component';
import { DeleteOrderComponent } from './components/modals/delete-order/delete-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    OrdersListComponent,
    AddOrderFormComponent,
    EditOrderFormComponent,
    DeleteOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
