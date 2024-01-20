import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOrderStatusComponent } from './change-order-status.component';

describe('ChangeOrderStatusComponent', () => {
  let component: ChangeOrderStatusComponent;
  let fixture: ComponentFixture<ChangeOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeOrderStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
