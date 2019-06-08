import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTicketComponent } from './check-ticket.component';

describe('CheckTicketComponent', () => {
  let component: CheckTicketComponent;
  let fixture: ComponentFixture<CheckTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
