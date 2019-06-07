import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePricelistComponent } from './update-pricelist.component';

describe('UpdatePricelistComponent', () => {
  let component: UpdatePricelistComponent;
  let fixture: ComponentFixture<UpdatePricelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePricelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
