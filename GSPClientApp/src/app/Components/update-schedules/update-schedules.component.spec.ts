import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSchedulesComponent } from './update-schedules.component';

describe('UpdateSchedulesComponent', () => {
  let component: UpdateSchedulesComponent;
  let fixture: ComponentFixture<UpdateSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
