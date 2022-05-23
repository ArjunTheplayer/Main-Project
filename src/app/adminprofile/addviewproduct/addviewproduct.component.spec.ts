import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddviewproductComponent } from './addviewproduct.component';

describe('AddviewproductComponent', () => {
  let component: AddviewproductComponent;
  let fixture: ComponentFixture<AddviewproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddviewproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddviewproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
